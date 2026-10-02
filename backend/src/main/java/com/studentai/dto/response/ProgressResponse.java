package com.studentai.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ProgressResponse {

    private Long id;

    private Long userId;

    private LocalDate date;

    private Integer algorithmsCompleted;

    private Integer quizScore;

    private Integer studyMinutes;

    private String weakTopics;

    private String strongTopics;

    private Integer dailyStreak;
}