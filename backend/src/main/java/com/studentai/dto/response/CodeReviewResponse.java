package com.studentai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeReviewResponse {
    private Long id;
    private String code;
    private String language;
    private List<FunctionExplanation> functionExplanations;
    private List<Bug> bugsFound;
    private List<Improvement> improvements;
    private Map<String, String> timeComplexity;
    private Map<String, String> spaceComplexity;
    private String optimizedCode;
    private String cleanerImplementation;
    private String overallSummary;
    private LocalDateTime createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FunctionExplanation {
        private String functionName;
        private String explanation;
        private String parameters;
        private String returnType;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Bug {
        private String description;
        private String location;
        private String severity; // LOW, MEDIUM, HIGH, CRITICAL
        private String fix;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Improvement {
        private String description;
        private String location;
        private String suggestion;
        private String impact; // LOW, MEDIUM, HIGH
    }
}
