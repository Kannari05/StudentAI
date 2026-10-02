package com.studentai.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "dsa_solutions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DSASolution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long algorithmId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String submittedCode;

    @Column(nullable = false)
    private String language; // e.g. java, python, javascript

    @Column(nullable = false)
    private String status; // ACCEPTED, WRONG_ANSWER, COMPILE_ERROR

    @Column(columnDefinition = "TEXT")
    private String aiFeedback;

    @Column(columnDefinition = "TEXT")
    private String output;

    @Column(nullable = false)
    private String timeComplexity;

    @Column(nullable = false)
    private String spaceComplexity;

    private LocalDateTime submittedAt;

    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
    }
}
