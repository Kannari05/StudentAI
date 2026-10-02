package com.studentai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgressSummaryResponse {
    private Integer totalAlgorithmsCompleted;
    private Double averageQuizScore;
    private Integer totalStudyHours;
    private Integer currentStreak;
    private List<String> weakTopics;
    private List<String> strongTopics;
    private Map<String, Integer> weeklyProgress; // Day of week -> study minutes
    private Map<String, Integer> monthlyProgress; // Day of month -> study minutes
    private Map<String, Integer> activityBreakdown; // Activity type -> count
}
