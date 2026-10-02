package com.studentai.service;

import com.studentai.model.OtpVerification;
import com.studentai.model.User;
import com.studentai.repository.OtpVerificationRepository;
import com.studentai.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import java.time.LocalDateTime;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OtpServiceTest {
    final OtpVerificationRepository codes = mock(OtpVerificationRepository.class);
    final UserRepository users = mock(UserRepository.class);
    final JavaMailSender mail = mock(JavaMailSender.class);
    final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    OtpService service;
    User user;
    @BeforeEach void setup() {
        service = new OtpService(codes, users, encoder, mail);
        ReflectionTestUtils.setField(service, "from", "test@example.com");
        user = User.builder().id(1L).email("student@example.com").enabled(true).build();
        when(users.findForOtp(user.getEmail())).thenReturn(Optional.of(user));
        when(codes.findTopByIdentifierOrderByCreatedAtDesc(user.getEmail())).thenReturn(Optional.empty());
    }
    OtpVerification challenge() {
        return OtpVerification.builder().identifier(user.getEmail()).userId(1L).type("EMAIL")
            .otp(encoder.encode("012345")).verified(false).attempts(0)
            .createdAt(LocalDateTime.now().minusMinutes(2)).expiresAt(LocalDateTime.now().plusMinutes(3)).build();
    }
    @Test void sendsCodeAndStoresOnlyHashWithRequiredFields() {
        service.sendOtp(user.getEmail());
        ArgumentCaptor<SimpleMailMessage> message = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mail).send(message.capture());
        String code = message.getValue().getText().split(": ")[1].substring(0, 6);
        ArgumentCaptor<OtpVerification> stored = ArgumentCaptor.forClass(OtpVerification.class);
        verify(codes).save(stored.capture());
        assertNotEquals(code, stored.getValue().getOtp());
        assertTrue(encoder.matches(code, stored.getValue().getOtp()));
        assertEquals(1L, stored.getValue().getUserId());
        assertEquals("EMAIL", stored.getValue().getType());
    }
    @Test void validCodeIsConsumedAndCannotBeReplayed() {
        OtpVerification c = challenge();
        when(codes.findTopByIdentifierOrderByCreatedAtDesc(user.getEmail())).thenReturn(Optional.of(c));
        assertTrue(service.verifyOtp(user.getEmail(), "012345").isPresent());
        assertTrue(service.verifyOtp(user.getEmail(), "012345").isEmpty());
    }
    @Test void fiveWrongAttemptsLockCodeAndResendUntilExpiry() {
        OtpVerification c = challenge();
        when(codes.findTopByIdentifierOrderByCreatedAtDesc(user.getEmail())).thenReturn(Optional.of(c));
        for (int i = 0; i < 5; i++) assertTrue(service.verifyOtp(user.getEmail(), "999999").isEmpty());
        assertEquals(5, c.getAttempts());
        assertTrue(service.verifyOtp(user.getEmail(), "012345").isEmpty());
        service.sendOtp(user.getEmail());
        verifyNoInteractions(mail);
    }
    @Test void expiredCodeIsRejected() {
        OtpVerification c = challenge(); c.setExpiresAt(LocalDateTime.now().minusSeconds(1));
        when(codes.findTopByIdentifierOrderByCreatedAtDesc(user.getEmail())).thenReturn(Optional.of(c));
        assertTrue(service.verifyOtp(user.getEmail(), "012345").isEmpty());
    }
    @Test void cooldownPreventsNewEmail() {
        OtpVerification c = challenge(); c.setCreatedAt(LocalDateTime.now());
        when(codes.findTopByIdentifierOrderByCreatedAtDesc(user.getEmail())).thenReturn(Optional.of(c));
        service.sendOtp(user.getEmail()); verifyNoInteractions(mail);
    }
    @Test void disabledAndUnknownAccountsCannotLogin() {
        user.setEnabled(false);
        service.sendOtp(user.getEmail());
        assertTrue(service.verifyOtp(user.getEmail(), "012345").isEmpty());
        assertTrue(service.verifyOtp("unknown@example.com", "012345").isEmpty());
        verifyNoInteractions(mail);
    }
}
