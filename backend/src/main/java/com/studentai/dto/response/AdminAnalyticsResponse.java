package com.studentai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminAnalyticsResponse {
    private Long totalUsers;
    private Long activeUsers;
    private Long totalQuizzes;
    private Long totalAlgorithms;
    private Long totalDocuments;
    private Long totalCodeReviews;
    private Map<String, Long> userGrowth; // Date -> user count
    private Map<String, Long> quizAttempts; // Date -> quiz attempts
    private Map<String, Long> algorithmCompletions; // Date -> completions
    private Map<String, Long> studyHours; // Date -> study hours
}
