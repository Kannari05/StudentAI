package com.studentai.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "document_items")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String filename;

    private String fileType;

    private Long fileSize;

    @Column(columnDefinition = "TEXT")
    private String extractedContent;

    private String status; // INDEXED, PROCESSING, ERROR

    private LocalDateTime uploadedAt;

    @PrePersist
    protected void onCreate() {
        uploadedAt = LocalDateTime.now();
    }
}
