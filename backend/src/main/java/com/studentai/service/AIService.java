package com.studentai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${groq.api-key}")
    private String apiKey;

    @Value("${groq.model}")
    private String model;

    @Value("${groq.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String askAI(String systemPrompt, String userPrompt) {

        try {

            String url = baseUrl + "/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> systemMessage = new HashMap<>();
            systemMessage.put("role", "system");
            systemMessage.put("content", systemPrompt);

            Map<String, Object> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", userPrompt);

            Map<String, Object> requestBody = new HashMap<>();

            requestBody.put("model", model);

            requestBody.put(
                    "messages",
                    List.of(
                            systemMessage,
                            userMessage
                    )
            );

            requestBody.put("temperature", 0.7);
            requestBody.put("max_tokens", 2000);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(
                            requestBody,
                            headers
                    );

            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            Map.class
                    );

            System.out.println(
                    "Groq HTTP Status: "
                            + response.getStatusCode()
            );

            if (!response.getStatusCode().is2xxSuccessful()) {

                System.err.println(
                        "Groq API Error: "
                                + response.getBody()
                );

                return "AI service error: "
                        + response.getStatusCode();
            }

            Map body = response.getBody();

            if (body == null) {
                return "AI service returned an empty response.";
            }

            Object choicesObject = body.get("choices");

            if (!(choicesObject instanceof List<?> choices)
                    || choices.isEmpty()) {

                System.err.println(
                        "Unexpected Groq response: " + body
                );

                return "AI service returned no choices.";
            }

            Object firstChoiceObject = choices.get(0);

            if (!(firstChoiceObject instanceof Map<?, ?> firstChoice)) {
                return "Invalid response from AI service.";
            }

            Object messageObject = firstChoice.get("message");

            if (!(messageObject instanceof Map<?, ?> message)) {
                return "AI service returned no message.";
            }

            Object contentObject = message.get("content");

            if (contentObject == null) {
                return "AI service returned empty content.";
            }

            String content = contentObject.toString().trim();

            if (content.isEmpty()) {
                return "AI service returned an empty answer.";
            }

            System.out.println("=================================");
            System.out.println("GROQ RESPONSE RECEIVED:");
            System.out.println(content);
            System.out.println("=================================");

            return content;

        } catch (RestClientException e) {

            System.err.println(
                    "Groq connection error: "
                            + e.getMessage()
            );

            return "Unable to connect to Groq AI: "
                    + e.getMessage();

        } catch (Exception e) {

            e.printStackTrace();

            return "Groq AI Error: "
                    + e.getMessage();
        }
    }
}