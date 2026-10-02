package com.studentai.service;

import com.studentai.model.ChatMessage;
import com.studentai.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private AIService aiService;

    public ChatMessage sendMessage(
            Long userId,
            String sessionId,
            String userContent,
            String topic) {

        System.out.println("=================================");
        System.out.println("CHAT REQUEST RECEIVED");
        System.out.println("User ID: " + userId);
        System.out.println("User message: " + userContent);
        System.out.println("Topic: " + topic);
        System.out.println("=================================");

        String effectiveSessionId =
                (sessionId != null && !sessionId.isBlank())
                        ? sessionId
                        : UUID.randomUUID().toString();

        ChatMessage userMsg = ChatMessage.builder()
                .userId(userId)
                .sessionId(effectiveSessionId)
                .sender("USER")
                .content(userContent)
                .build();

        chatMessageRepository.save(userMsg);

        System.out.println("Calling AIService...");

        String aiResponseText =
                aiService.askAI(
                        "You are a helpful Computer Science tutor. " +
                        "Answer the user's question naturally and directly. " +
                        "Do not invent an algorithm analysis unless the user asks for it.",
                        userContent
                );

        System.out.println("=================================");
        System.out.println("AIService RETURNED:");
        System.out.println(aiResponseText);
        System.out.println("=================================");

        ChatMessage aiMsg = ChatMessage.builder()
                .userId(userId)
                .sessionId(effectiveSessionId)
                .sender("AI")
                .content(aiResponseText)
                .build();

        return chatMessageRepository.save(aiMsg);
    }

    public List<ChatMessage> getChatHistory(Long userId) {

        return chatMessageRepository
                .findByUserIdOrderByTimestampAsc(userId);
    }

    public List<ChatMessage> getSessionMessages(
            String sessionId) {

        return chatMessageRepository
                .findBySessionIdOrderByTimestampAsc(sessionId);
    }
}