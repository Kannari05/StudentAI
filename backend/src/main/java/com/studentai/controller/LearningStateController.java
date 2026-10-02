package com.studentai.controller;

import com.studentai.model.LearningState;
import com.studentai.model.User;
import com.studentai.repository.UserRepository;
import com.studentai.service.LearningStateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/learning-state")
@CrossOrigin(origins = "*")
public class LearningStateController {

    private final LearningStateService learningStateService;
    private final UserRepository userRepository;

    public LearningStateController(
            LearningStateService learningStateService,
            UserRepository userRepository) {

        this.learningStateService = learningStateService;
        this.userRepository = userRepository;
    }

    // Get current learning position
    @GetMapping
    public ResponseEntity<LearningState> getLearningState(
            Authentication authentication) {

        String userId = getUserId(authentication);

        return ResponseEntity.ok(
                learningStateService.getState(userId)
        );
    }

    // Save current learning position
    @PutMapping
    public ResponseEntity<LearningState> saveLearningState(
            @RequestBody LearningState state,
            Authentication authentication) {

        String userId = getUserId(authentication);

        return ResponseEntity.ok(
                learningStateService.saveState(
                        userId,
                        state
                )
        );
    }

    private String getUserId(Authentication authentication) {

        String username = authentication.getName();

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return String.valueOf(user.getId());
    }
}