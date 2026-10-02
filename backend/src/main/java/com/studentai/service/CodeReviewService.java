package com.studentai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.studentai.dto.request.CodeReviewRequest;
import com.studentai.dto.response.CodeReviewResponse;
import com.studentai.model.CodeReview;
import com.studentai.repository.CodeReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CodeReviewService {

    private final CodeReviewRepository codeReviewRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    // ============================================================
    // GROQ CONFIGURATION
    // ============================================================

    @Value("${groq.api-key}")
    private String groqApiKey;

    @Value("${groq.base-url}")
    private String baseUrl;

    @Value("${groq.model}")
    private String groqModel;


    // ============================================================
    // MAIN CODE REVIEW METHOD
    // ============================================================

    public CodeReviewResponse reviewCode(
            CodeReviewRequest request,
            String userId) {

        try {

            String prompt = buildPrompt(request);

            // Call Groq
            String aiResponse = callGroq(prompt);

            // Parse AI JSON
            CodeReviewResponse response =
                    parseAIResponse(aiResponse, request);


            // ----------------------------------------------------
            // Save review to database
            // ----------------------------------------------------

            CodeReview codeReview = CodeReview.builder()
                    .userId(userId)
                    .code(request.getCode())
                    .language(request.getLanguage())
                    .functionExplanations(
                            serializeToJson(
                                    response.getFunctionExplanations()
                            )
                    )
                    .bugsFound(
                            serializeToJson(
                                    response.getBugsFound()
                            )
                    )
                    .improvements(
                            serializeToJson(
                                    response.getImprovements()
                            )
                    )
                    .timeComplexity(
                            serializeToJson(
                                    response.getTimeComplexity()
                            )
                    )
                    .spaceComplexity(
                            serializeToJson(
                                    response.getSpaceComplexity()
                            )
                    )
                    .optimizedCode(
                            response.getOptimizedCode()
                    )
                    .cleanerImplementation(
                            response.getCleanerImplementation()
                    )
                    .overallSummary(
                            response.getOverallSummary()
                    )
                    .build();

            codeReview =
                    codeReviewRepository.save(codeReview);

            response.setId(codeReview.getId());
            response.setCreatedAt(codeReview.getCreatedAt());

            return response;

        } catch (Exception e) {

            log.error(
                    "Error reviewing code",
                    e
            );

            throw new RuntimeException(
                    "Failed to review code: "
                            + e.getMessage(),
                    e
            );
        }
    }


    // ============================================================
    // BUILD AI PROMPT
    // ============================================================

    private String buildPrompt(
            CodeReviewRequest request) {

        String language =
                getLanguageName(
                        request.getLanguage()
                );

        return """
                You are an expert software engineer and code reviewer
                inside an application called StudentAI.

                Review the following %s code.

                CODE:
                ```
                %s
                ```

                Analyze the code carefully.

                Provide:

                1. Function Explanations
                   - Function name
                   - Purpose
                   - Parameters
                   - Return type

                2. Bugs Found
                   - Description
                   - Location
                   - Severity
                   - Fix

                Severity must be one of:
                LOW
                MEDIUM
                HIGH
                CRITICAL

                3. Improvements
                   - Description
                   - Location
                   - Suggestion
                   - Impact

                Impact must be one of:
                LOW
                MEDIUM
                HIGH

                4. Time Complexity
                   Give Big-O complexity for every important function.

                5. Space Complexity
                   Give Big-O complexity for every important function.

                6. Optimized Code
                   Provide an improved version of the code.

                7. Cleaner Implementation
                   Provide a clean, readable implementation.

                8. Overall Summary
                   Give a short assessment of the code quality.

                IMPORTANT:

                Return ONLY valid JSON.

                Do not use markdown.
                Do not put the JSON inside ``` blocks.
                Do not add explanations before or after the JSON.

                Use exactly this structure:

                {
                  "function_explanations": [
                    {
                      "function_name": "...",
                      "explanation": "...",
                      "parameters": "...",
                      "return_type": "..."
                    }
                  ],
                  "bugs_found": [
                    {
                      "description": "...",
                      "location": "...",
                      "severity": "LOW",
                      "fix": "..."
                    }
                  ],
                  "improvements": [
                    {
                      "description": "...",
                      "location": "...",
                      "suggestion": "...",
                      "impact": "LOW"
                    }
                  ],
                  "time_complexity": {
                    "function_name": "O(n)"
                  },
                  "space_complexity": {
                    "function_name": "O(n)"
                  },
                  "optimized_code": "...",
                  "cleaner_implementation": "...",
                  "overall_summary": "..."
                }
                """.formatted(
                language,
                request.getCode()
        );
    }


    // ============================================================
    // GROQ API CALL
    // ============================================================

    private String callGroq(String prompt) {

        try {

            // Example:
            // https://api.groq.com/openai/v1
            // becomes:
            // https://api.groq.com/openai/v1/chat/completions

            String url =
                    baseUrl + "/chat/completions";


            // ----------------------------------------------------
            // Headers
            // ----------------------------------------------------

            HttpHeaders headers =
                    new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_JSON
            );

            headers.setBearerAuth(
                    groqApiKey
            );


            // ----------------------------------------------------
            // Request JSON
            // ----------------------------------------------------

            ObjectNode requestBody =
                    objectMapper.createObjectNode();

            requestBody.put(
                    "model",
                    groqModel
            );

            requestBody.put(
                    "temperature",
                    0.2
            );

            requestBody.put(
                    "max_tokens",
                    8000
            );


            // ----------------------------------------------------
            // Messages
            // ----------------------------------------------------

            var messages =
                    requestBody.putArray(
                            "messages"
                    );

            ObjectNode message =
                    messages.addObject();

            message.put(
                    "role",
                    "user"
            );

            message.put(
                    "content",
                    prompt
            );


            // ----------------------------------------------------
            // HTTP Entity
            // ----------------------------------------------------

            String requestJson =
                    objectMapper.writeValueAsString(
                            requestBody
                    );

            HttpEntity<String> entity =
                    new HttpEntity<>(
                            requestJson,
                            headers
                    );


            // ----------------------------------------------------
            // Send request to Groq
            // ----------------------------------------------------

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            String.class
                    );


            // ----------------------------------------------------
            // Check HTTP status
            // ----------------------------------------------------

            if (!response
                    .getStatusCode()
                    .is2xxSuccessful()) {

                log.error(
                        "Groq API failed: {}",
                        response.getStatusCode()
                );

                log.error(
                        "Groq response: {}",
                        response.getBody()
                );

                throw new RuntimeException(
                        "Groq API request failed: "
                                + response.getStatusCode()
                );
            }


            // ----------------------------------------------------
            // Check response body
            // ----------------------------------------------------

            if (response.getBody() == null ||
                    response.getBody().isBlank()) {

                throw new RuntimeException(
                        "Groq returned an empty response"
                );
            }


            // ----------------------------------------------------
            // Parse Groq response
            // ----------------------------------------------------

            JsonNode root =
                    objectMapper.readTree(
                            response.getBody()
                    );


            // ----------------------------------------------------
            // Check Groq error
            // ----------------------------------------------------

            if (root.has("error")) {

                String error =
                        root.path("error")
                                .path("message")
                                .asText();

                throw new RuntimeException(
                        "Groq API error: "
                                + error
                );
            }


            // ----------------------------------------------------
            // Get choices
            // ----------------------------------------------------

            JsonNode choices =
                    root.path("choices");

            if (!choices.isArray() ||
                    choices.isEmpty()) {

                throw new RuntimeException(
                        "Groq returned no choices"
                );
            }


            // ----------------------------------------------------
            // Get AI message
            // ----------------------------------------------------

            JsonNode messageNode =
                    choices
                            .get(0)
                            .path("message");


            String answer =
                    messageNode
                            .path("content")
                            .asText();


            if (answer == null ||
                    answer.isBlank()) {

                throw new RuntimeException(
                        "Groq returned empty content"
                );
            }


            // ----------------------------------------------------
            // Clean accidental markdown
            // ----------------------------------------------------

            answer = answer.trim();

            if (answer.startsWith("```json")) {

                answer =
                        answer.substring(7);

            } else if (answer.startsWith("```")) {

                answer =
                        answer.substring(3);
            }

            if (answer.endsWith("```")) {

                answer =
                        answer.substring(
                                0,
                                answer.length() - 3
                        );
            }


            return answer.trim();

        } catch (Exception e) {

            log.error(
                    "Error calling Groq API",
                    e
            );

            throw new RuntimeException(
                    "Groq API error: "
                            + e.getMessage(),
                    e
            );
        }
    }


    // ============================================================
    // PARSE AI JSON
    // ============================================================

    private CodeReviewResponse parseAIResponse(
            String aiResponse,
            CodeReviewRequest request) {

        try {

            JsonNode root =
                    objectMapper.readTree(
                            aiResponse
                    );


            // ----------------------------------------------------
            // Function explanations
            // ----------------------------------------------------

            List<CodeReviewResponse.FunctionExplanation>
                    functionExplanations =
                    new ArrayList<>();

            if (root.has("function_explanations") &&
                    root.get("function_explanations")
                            .isArray()) {

                for (JsonNode node :
                        root.path(
                                "function_explanations"
                        )) {

                    functionExplanations.add(
                            CodeReviewResponse
                                    .FunctionExplanation
                                    .builder()
                                    .functionName(
                                            node.path(
                                                    "function_name"
                                            ).asText()
                                    )
                                    .explanation(
                                            node.path(
                                                    "explanation"
                                            ).asText()
                                    )
                                    .parameters(
                                            node.path(
                                                    "parameters"
                                            ).asText()
                                    )
                                    .returnType(
                                            node.path(
                                                    "return_type"
                                            ).asText()
                                    )
                                    .build()
                    );
                }
            }


            // ----------------------------------------------------
            // Bugs
            // ----------------------------------------------------

            List<CodeReviewResponse.Bug>
                    bugsFound =
                    new ArrayList<>();

            if (root.has("bugs_found") &&
                    root.get("bugs_found")
                            .isArray()) {

                for (JsonNode node :
                        root.path("bugs_found")) {

                    bugsFound.add(
                            CodeReviewResponse
                                    .Bug
                                    .builder()
                                    .description(
                                            node.path(
                                                    "description"
                                            ).asText()
                                    )
                                    .location(
                                            node.path(
                                                    "location"
                                            ).asText()
                                    )
                                    .severity(
                                            node.path(
                                                    "severity"
                                            ).asText()
                                    )
                                    .fix(
                                            node.path(
                                                    "fix"
                                            ).asText()
                                    )
                                    .build()
                    );
                }
            }


            // ----------------------------------------------------
            // Improvements
            // ----------------------------------------------------

            List<CodeReviewResponse.Improvement>
                    improvements =
                    new ArrayList<>();

            if (root.has("improvements") &&
                    root.get("improvements")
                            .isArray()) {

                for (JsonNode node :
                        root.path("improvements")) {

                    improvements.add(
                            CodeReviewResponse
                                    .Improvement
                                    .builder()
                                    .description(
                                            node.path(
                                                    "description"
                                            ).asText()
                                    )
                                    .location(
                                            node.path(
                                                    "location"
                                            ).asText()
                                    )
                                    .suggestion(
                                            node.path(
                                                    "suggestion"
                                            ).asText()
                                    )
                                    .impact(
                                            node.path(
                                                    "impact"
                                            ).asText()
                                    )
                                    .build()
                    );
                }
            }


            // ----------------------------------------------------
            // Time complexity
            // ----------------------------------------------------

            Map<String, String>
                    timeComplexity =
                    new HashMap<>();

            if (root.has("time_complexity") &&
                    root.get("time_complexity")
                            .isObject()) {

                root.path("time_complexity")
                        .fields()
                        .forEachRemaining(
                                entry ->
                                        timeComplexity.put(
                                                entry.getKey(),
                                                entry.getValue()
                                                        .asText()
                                        )
                        );
            }


            // ----------------------------------------------------
            // Space complexity
            // ----------------------------------------------------

            Map<String, String>
                    spaceComplexity =
                    new HashMap<>();

            if (root.has("space_complexity") &&
                    root.get("space_complexity")
                            .isObject()) {

                root.path("space_complexity")
                        .fields()
                        .forEachRemaining(
                                entry ->
                                        spaceComplexity.put(
                                                entry.getKey(),
                                                entry.getValue()
                                                        .asText()
                                        )
                        );
            }


            // ----------------------------------------------------
            // Final response
            // ----------------------------------------------------

            return CodeReviewResponse
                    .builder()
                    .code(
                            request.getCode()
                    )
                    .language(
                            request.getLanguage()
                    )
                    .functionExplanations(
                            functionExplanations
                    )
                    .bugsFound(
                            bugsFound
                    )
                    .improvements(
                            improvements
                    )
                    .timeComplexity(
                            timeComplexity
                    )
                    .spaceComplexity(
                            spaceComplexity
                    )
                    .optimizedCode(
                            root.path(
                                    "optimized_code"
                            ).asText("")
                    )
                    .cleanerImplementation(
                            root.path(
                                    "cleaner_implementation"
                            ).asText("")
                    )
                    .overallSummary(
                            root.path(
                                    "overall_summary"
                            ).asText("")
                    )
                    .build();

        } catch (Exception e) {

            log.error(
                    "Error parsing AI JSON",
                    e
            );

            log.error(
                    "AI response was: {}",
                    aiResponse
            );

            throw new RuntimeException(
                    "Failed to parse AI response: "
                            + e.getMessage(),
                    e
            );
        }
    }


    // ============================================================
    // LANGUAGE
    // ============================================================

    private String getLanguageName(
            String language) {

        if (language == null) {
            return "programming";
        }

        return switch (
                language.toUpperCase()
        ) {

            case "JAVA" ->
                    "Java";

            case "PYTHON" ->
                    "Python";

            case "CPP" ->
                    "C++";

            case "JAVASCRIPT" ->
                    "JavaScript";

            case "TYPESCRIPT" ->
                    "TypeScript";

            case "C" ->
                    "C";

            default ->
                    language;
        };
    }


    // ============================================================
    // SERIALIZE
    // ============================================================

    private String serializeToJson(
            Object obj) {

        try {

            return objectMapper.writeValueAsString(
                    obj
            );

        } catch (Exception e) {

            log.error(
                    "Error serializing JSON",
                    e
            );

            return "{}";
        }
    }


    // ============================================================
    // GET USER REVIEWS
    // ============================================================

    public List<CodeReview> getUserCodeReviews(
            String userId) {

        return codeReviewRepository
                .findByUserIdOrderByCreatedAtDesc(
                        userId
                );
    }


    // ============================================================
    // GET SINGLE REVIEW
    // ============================================================

    public CodeReview getCodeReview(
            Long id,
            String userId) {

        CodeReview review =
                codeReviewRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Code review not found"
                                )
                        );

        if (!review.getUserId().equals(userId)) {

            throw new RuntimeException(
                    "Unauthorized access to code review"
            );
        }

        return review;
    }


    // ============================================================
    // DELETE REVIEW
    // ============================================================

    public void deleteCodeReview(
            Long id,
            String userId) {

        CodeReview review =
                codeReviewRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Code review not found"
                                )
                        );

        if (!review.getUserId().equals(userId)) {

            throw new RuntimeException(
                    "Unauthorized access to code review"
            );
        }

        codeReviewRepository
                .deleteByUserIdAndId(
                        userId,
                        id
                );
    }
}