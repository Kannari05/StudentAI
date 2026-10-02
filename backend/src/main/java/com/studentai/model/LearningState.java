package com.studentai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "learning_state")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private String currentCourse;

    @Column(nullable = false)
    private String currentTopic;

    @Column(nullable = false)
    private Integer currentLesson;

    @Column(nullable = false)
    private Integer currentQuestion;

    @Column(nullable = false)
    private Integer completionPercentage;

    @Column(nullable = false)
    private LocalDateTime lastActivity;

    @PrePersist
    protected void onCreate() {
        lastActivity = LocalDateTime.now();

        if (currentLesson == null) {
            currentLesson = 1;
        }

        if (currentQuestion == null) {
            currentQuestion = 1;
        }

        if (completionPercentage == null) {
            completionPercentage = 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        lastActivity = LocalDateTime.now();
    }
}