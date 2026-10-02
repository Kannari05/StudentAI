package com.studentai.controller;

import com.studentai.model.DocumentItem;
import com.studentai.service.RAGService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rag")
@CrossOrigin(origins = "*")
public class RAGController {

    @Autowired
    private RAGService ragService;

    @PostMapping("/upload")
    public ResponseEntity<DocumentItem> uploadDocument(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId,
            @RequestBody Map<String, String> payload) {
        String filename = payload.getOrDefault("filename", "study_notes.txt");
        String content = payload.getOrDefault("content", "");
        return ResponseEntity.ok(ragService.uploadDocument(userId, filename, content));
    }

    @GetMapping("/documents")
    public ResponseEntity<List<DocumentItem>> getDocuments(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId) {
        return ResponseEntity.ok(ragService.getUserDocuments(userId));
    }

    @PostMapping("/query")
    public ResponseEntity<Map<String, String>> queryRAG(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId,
            @RequestBody Map<String, String> payload) {
        String query = payload.getOrDefault("query", "");
        String answer = ragService.queryDocument(userId, query);
        return ResponseEntity.ok(Map.of("query", query, "answer", answer));
    }
}
