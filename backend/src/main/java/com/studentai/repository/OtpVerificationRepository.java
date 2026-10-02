package com.studentai.repository;

import com.studentai.model.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpVerificationRepository
        extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification> findTopByIdentifierAndVerifiedFalseOrderByCreatedAtDesc(
            String identifier
    );

    Optional<OtpVerification> findTopByIdentifierOrderByCreatedAtDesc(String identifier);

    void deleteByIdentifier(String identifier);
}