package com.studentai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GrokService {

    @Value("${groq.api-key}")
    private String apiKey;

    @Value("${groq.model}")
    private String model;

    @Value("${groq.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateAnswer(String question) {

        try {

            String prompt = """
                    You are StudentAI, an intelligent AI tutor.

                    Current date should be considered when answering questions.

                    Rules:
                    - Explain according to the student's level.
                    - Use simple English.
                    - Give examples whenever needed.
                    - If the student asks for code, provide clean code with explanation.
                    - Don't repeat the same answer.
                    - If the question is unclear, ask a follow-up question.
                    - Clearly mention when information is uncertain.
                    - End every answer with one short practice question.

                    Student Question:
                    """ + question;

            // --------------------------------------------------
            // URL
            // --------------------------------------------------

            String url = baseUrl + "/chat/completions";

            // --------------------------------------------------
            // HEADERS
            // --------------------------------------------------

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            // --------------------------------------------------
            // MESSAGE
            // --------------------------------------------------

            Map<String, String> message = new HashMap<>();

            message.put("role", "user");
            message.put("content", prompt);

            // --------------------------------------------------
            // REQUEST BODY
            // --------------------------------------------------

            Map<String, Object> requestBody = new HashMap<>();

            requestBody.put("model", model);
            requestBody.put(
                    "messages",
                    List.of(message)
            );

            requestBody.put("temperature", 0.7);
            requestBody.put("max_tokens", 2000);

            // --------------------------------------------------
            // HTTP REQUEST
            // --------------------------------------------------

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

            // --------------------------------------------------
            // CHECK RESPONSE
            // --------------------------------------------------

            if (!response.getStatusCode().is2xxSuccessful()) {

                return "Groq API Error: "
                        + response.getStatusCode();
            }

            if (response.getBody() == null) {

                return "Groq returned an empty response.";
            }

            // --------------------------------------------------
            // EXTRACT RESPONSE
            // --------------------------------------------------

            Map body = response.getBody();

            Object choicesObject =
                    body.get("choices");

            if (!(choicesObject instanceof List)) {

                return "Groq returned an invalid response.";
            }

            List choices =
                    (List) choicesObject;

            if (choices.isEmpty()) {

                return "Groq returned no response.";
            }

            Map firstChoice =
                    (Map) choices.get(0);

            Map messageResponse =
                    (Map) firstChoice.get("message");

            if (messageResponse == null) {

                return "Groq returned no message.";
            }

            Object content =
                    messageResponse.get("content");

            if (content == null) {

                return "Groq returned empty content.";
            }

            return content.toString();

        } catch (Exception e) {

            e.printStackTrace();

            return "Groq Error: " + e.getMessage();
        }
    }
}