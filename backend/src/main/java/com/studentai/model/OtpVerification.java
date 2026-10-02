package com.studentai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_verifications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OtpVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ============================================================
    // USER
    // ============================================================

    @Column(nullable = false)
    private Long userId;

    // ============================================================
    // EMAIL OR PHONE
    // ============================================================

    @Column(nullable = false)
    private String identifier;

    // EMAIL or PHONE
    @Column(nullable = false)
    private String type;

    // ============================================================
    // OTP
    // ============================================================

    @Column(nullable = false)
    private String otp;

    // ============================================================
    // EXPIRATION
    // ============================================================

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    // ============================================================
    // VERIFICATION STATUS
    // ============================================================

    @Column(nullable = false)
    private Boolean verified;

    // ============================================================
    // ATTEMPTS
    // ============================================================

    @Column(nullable = false)
    private Integer attempts;

    // ============================================================
    // CREATED TIME
    // ============================================================

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // ============================================================
    // CREATE DEFAULT VALUES
    // ============================================================

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();

        if (verified == null) {
            verified = false;
        }

        if (attempts == null) {
            attempts = 0;
        }
    }
}