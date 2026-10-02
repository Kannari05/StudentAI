package com.studentai.controller;

import com.studentai.dto.request.ProgressRequest;
import com.studentai.dto.response.ProgressResponse;
import com.studentai.model.Progress;
import com.studentai.model.User;
import com.studentai.repository.UserRepository;
import com.studentai.service.ProgressService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    private final ProgressService progressService;
    private final UserRepository userRepository;

    public ProgressController(
            ProgressService progressService,
            UserRepository userRepository) {

        this.progressService = progressService;
        this.userRepository = userRepository;
    }

    // ============================================================
    // SAVE / UPDATE PROGRESS
    // ============================================================

    @PostMapping
    public ResponseEntity<ProgressResponse> saveProgress(
            Authentication authentication,
            @Valid @RequestBody ProgressRequest request) {

        Long userId = getUserId(authentication);

        Progress progress = Progress.builder()
                .algorithmsCompleted(request.getAlgorithmsCompleted())
                .quizScore(request.getQuizScore())
                .studyMinutes(request.getStudyMinutes())
                .weakTopics(request.getWeakTopics())
                .strongTopics(request.getStrongTopics())
                .dailyStreak(request.getDailyStreak())
                .build();

        Progress savedProgress =
                progressService.saveProgress(userId, progress);

        return ResponseEntity.ok(convertToResponse(savedProgress));
    }

    // ============================================================
    // GET TODAY'S / LATEST PROGRESS
    // ============================================================

    @GetMapping("/latest")
    public ResponseEntity<ProgressResponse> getLatestProgress(
            Authentication authentication) {

        Long userId = getUserId(authentication);

        Progress progress =
                progressService.getTodayProgress(userId);

        if (progress == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(convertToResponse(progress));
    }

    // ============================================================
    // GET ALL USER PROGRESS
    // ============================================================

    @GetMapping
    public ResponseEntity<List<ProgressResponse>> getAllProgress(
            Authentication authentication) {

        Long userId = getUserId(authentication);

        List<Progress> progressList =
                progressService.getUserProgress(userId);

        if (progressList == null || progressList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<ProgressResponse> responseList =
                progressList.stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(responseList);
    }

    // ============================================================
    // GET USER ID FROM LOGGED-IN USER
    // ============================================================

    private Long getUserId(Authentication authentication) {

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new RuntimeException("User is not authenticated");
        }

        String username = authentication.getName();

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return user.getId();
    }

    // ============================================================
    // CONVERT ENTITY -> RESPONSE
    // ============================================================

    private ProgressResponse convertToResponse(Progress progress) {

        return ProgressResponse.builder()
                .id(progress.getId())
                .userId(progress.getUserId())
                .date(progress.getDate())
                .algorithmsCompleted(
                        progress.getAlgorithmsCompleted()
                )
                .quizScore(
                        progress.getQuizScore()
                )
                .studyMinutes(
                        progress.getStudyMinutes()
                )
                .weakTopics(
                        progress.getWeakTopics()
                )
                .strongTopics(
                        progress.getStrongTopics()
                )
                .dailyStreak(
                        progress.getDailyStreak()
                )
                .build();
    }
}