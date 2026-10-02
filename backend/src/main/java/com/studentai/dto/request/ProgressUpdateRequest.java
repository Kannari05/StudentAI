package com.studentai.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgressUpdateRequest {

    @NotNull(message = "Activity type is required")
    private String activityType; // ALGORITHM, QUIZ, CHAT, PROGRAMMING_TUTOR, RAG, CODE_REVIEW

    private String topic;

    @PositiveOrZero(message = "Duration must be positive")
    private Integer durationMinutes;

    @PositiveOrZero(message = "Score must be positive")
    private Integer score;

    private Boolean completed;

    private String notes;
}
