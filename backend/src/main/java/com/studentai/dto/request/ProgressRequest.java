package com.studentai.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProgressRequest {

    @NotNull
    @Min(0)
    private Integer algorithmsCompleted;

    @NotNull
    @Min(0)
    private Integer quizScore;

    @NotNull
    @Min(0)
    private Integer studyMinutes;

    private String weakTopics;

    private String strongTopics;

    @NotNull
    @Min(0)
    private Integer dailyStreak;
}