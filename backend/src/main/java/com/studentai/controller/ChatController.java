package com.studentai.controller;

import com.studentai.dto.request.ChatMessageRequest;
import com.studentai.model.ChatMessage;
import com.studentai.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatMessage> sendMessage(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId,
            @Valid @RequestBody ChatMessageRequest request) {

        System.out.println("=================================");
        System.out.println("CHAT CONTROLLER CALLED");
        System.out.println("User ID: " + userId);
        System.out.println("Message: " + request.getMessage());
        System.out.println("Topic: " + request.getTopic());
        System.out.println("Session ID: " + request.getSessionId());
        System.out.println("=================================");

        ChatMessage response = chatService.sendMessage(
                userId,
                request.getSessionId(),
                request.getMessage(),
                request.getTopic()
        );

        System.out.println("CHAT CONTROLLER RESPONSE:");

        if (response != null) {
            System.out.println(response.getContent());
        } else {
            System.out.println("Response is NULL");
        }

        System.out.println("=================================");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<ChatMessage>> getHistory(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId) {

        System.out.println("=================================");
        System.out.println("CHAT HISTORY REQUEST");
        System.out.println("User ID: " + userId);
        System.out.println("=================================");

        return ResponseEntity.ok(
                chatService.getChatHistory(userId)
        );
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<ChatMessage>> getSessionMessages(
            @PathVariable String sessionId) {

        System.out.println("=================================");
        System.out.println("SESSION MESSAGES REQUEST");
        System.out.println("Session ID: " + sessionId);
        System.out.println("=================================");

        return ResponseEntity.ok(
                chatService.getSessionMessages(sessionId)
        );
    }
}