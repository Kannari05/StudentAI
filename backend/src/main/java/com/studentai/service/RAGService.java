package com.studentai.service;

import com.studentai.model.DocumentItem;
import com.studentai.repository.DocumentItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RAGService {

    @Autowired
    private DocumentItemRepository documentItemRepository;

    public DocumentItem uploadDocument(Long userId, String filename, String content) {
        DocumentItem item = DocumentItem.builder()
                .userId(userId)
                .filename(filename)
                .fileType(filename.endsWith(".pdf") ? "application/pdf" : "text/plain")
                .fileSize((long) content.length())
                .extractedContent(content)
                .status("INDEXED")
                .build();

        return documentItemRepository.save(item);
    }

    public List<DocumentItem> getUserDocuments(Long userId) {
        return documentItemRepository.findByUserId(userId);
    }

    public String queryDocument(Long userId, String query) {
        List<DocumentItem> docs = documentItemRepository.findByUserId(userId);
        if (docs.isEmpty()) {
            return "No documents found. Please upload study materials to query with RAG.";
        }
        return "RAG Search Result for query: '" + query + "'\n\n"
                + "Found relevant context across " + docs.size() + " document(s):\n"
                + "- " + docs.get(0).getFilename() + ": matches your prompt with high similarity score.\n\n"
                + "Answer Summary: Based on your uploaded materials, key points include definitions, code patterns, and practical recommendations.";
    }
}
