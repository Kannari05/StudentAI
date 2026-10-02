package com.studentai.controller;

import com.studentai.config.JwtTokenProvider;
import com.studentai.dto.request.OtpRequest;
import com.studentai.dto.request.OtpVerifyRequest;
import com.studentai.dto.response.AuthResponse;
import com.studentai.model.User;
import com.studentai.service.OtpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/otp")
@RequiredArgsConstructor
public class OtpController {
    private final OtpService otpService;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/send")
    public Map<String, String> send(@Valid @RequestBody OtpRequest request) {
        otpService.sendOtp(request.getIdentifier().trim());
        return Map.of("message", "If this email belongs to an active account, a code has been sent. Wait 60 seconds before resending.");
    }

    @PostMapping("/verify")
    public AuthResponse verify(@Valid @RequestBody OtpVerifyRequest request) {
        // Service commits failed attempts before this controller raises an HTTP error.
        User user = otpService.verifyOtp(request.getIdentifier().trim(), request.getOtp())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Invalid or expired code. After 5 attempts, wait 5 minutes and request a new code."));
        return AuthResponse.builder().token(tokenProvider.generateToken(user.getUsername(), user.getRole()))
            .tokenType("Bearer").userId(user.getId()).username(user.getUsername())
            .email(user.getEmail()).role(user.getRole()).build();
    }
}
