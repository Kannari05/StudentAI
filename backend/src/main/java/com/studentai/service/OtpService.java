package com.studentai.service;

import com.studentai.model.OtpVerification;
import com.studentai.model.User;
import com.studentai.repository.OtpVerificationRepository;
import com.studentai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OtpService {
    private final OtpVerificationRepository otpRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final SecureRandom random = new SecureRandom();
    @Value("${app.otp.from}") private String from;

    @Transactional
    public void sendOtp(String email) {
        User user = userRepository.findForOtp(email).orElse(null);
        if (user == null || !Boolean.TRUE.equals(user.getEnabled())) return;
        String identifier = user.getEmail();
        LocalDateTime now = LocalDateTime.now();
        Optional<OtpVerification> previous = otpRepository.findTopByIdentifierOrderByCreatedAtDesc(identifier);
        if (previous.isPresent()) {
            OtpVerification old = previous.get();
            // Resending does not reset a locked challenge until its five-minute window ends.
            if (old.getCreatedAt().plusSeconds(60).isAfter(now) ||
                (old.getAttempts() >= 5 && old.getExpiresAt().isAfter(now))) return;
        }
        String code = String.format("%06d", random.nextInt(1_000_000));
        otpRepository.deleteByIdentifier(identifier);
        otpRepository.flush();
        otpRepository.save(OtpVerification.builder().userId(user.getId()).identifier(identifier)
            .type("EMAIL").otp(passwordEncoder.encode(code)).attempts(0).verified(false)
            .createdAt(now).expiresAt(now.plusMinutes(5)).build());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(identifier);
        message.setSubject("StudentAI login code");
        message.setText("Your StudentAI login code is: " + code +
            "\nIt expires in 5 minutes. If you did not request it, ignore this email.");
        try { mailSender.send(message); }
        catch (org.springframework.mail.MailException ex) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                "Email could not be sent. Please try again later.");
        }
    }

    @Transactional
    public Optional<User> verifyOtp(String email, String code) {
        User user = userRepository.findForOtp(email).orElse(null);
        if (user == null || !Boolean.TRUE.equals(user.getEnabled())) return Optional.empty();
        OtpVerification challenge = otpRepository.findTopByIdentifierOrderByCreatedAtDesc(user.getEmail()).orElse(null);
        if (challenge == null || Boolean.TRUE.equals(challenge.getVerified()) ||
            !challenge.getExpiresAt().isAfter(LocalDateTime.now()) || challenge.getAttempts() >= 5)
            return Optional.empty();
        challenge.setAttempts(challenge.getAttempts() + 1);
        boolean valid = passwordEncoder.matches(code, challenge.getOtp());
        if (valid) challenge.setVerified(true);
        otpRepository.save(challenge);
        return valid ? Optional.of(user) : Optional.empty();
    }
}
