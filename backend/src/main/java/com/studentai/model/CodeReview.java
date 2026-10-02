package com.studentai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "code_reviews")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String code;

    @Column(nullable = false)
    private String language; // JAVA, PYTHON, CPP, JAVASCRIPT

    @Column(columnDefinition = "TEXT")
    private String functionExplanations; // JSON array of function explanations

    @Column(columnDefinition = "TEXT")
    private String bugsFound; // JSON array of bugs

    @Column(columnDefinition = "TEXT")
    private String improvements; // JSON array of improvements

    @Column(columnDefinition = "TEXT")
    private String timeComplexity; // JSON mapping functions to time complexity

    @Column(columnDefinition = "TEXT")
    private String spaceComplexity; // JSON mapping functions to space complexity

    @Column(columnDefinition = "TEXT")
    private String optimizedCode; // Optimized version of the code

    @Column(columnDefinition = "TEXT")
    private String cleanerImplementation; // Cleaner implementation

    @Column(columnDefinition = "TEXT")
    private String overallSummary; // Overall summary of the code review

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
