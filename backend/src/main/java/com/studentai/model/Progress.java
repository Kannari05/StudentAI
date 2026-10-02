package com.studentai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "progress",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"user_id", "date"}
                )
        }
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer algorithmsCompleted;

    @Column(nullable = false)
    private Integer quizScore;

    @Column(nullable = false)
    private Integer studyMinutes;

    @Column(columnDefinition = "TEXT")
    private String weakTopics;

    @Column(columnDefinition = "TEXT")
    private String strongTopics;

    @Column(nullable = false)
    private Integer dailyStreak;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();

        if (algorithmsCompleted == null) {
            algorithmsCompleted = 0;
        }

        if (quizScore == null) {
            quizScore = 0;
        }

        if (studyMinutes == null) {
            studyMinutes = 0;
        }

        if (weakTopics == null) {
            weakTopics = "[]";
        }

        if (strongTopics == null) {
            strongTopics = "[]";
        }

        if (dailyStreak == null) {
            dailyStreak = 0;
        }
    }
}