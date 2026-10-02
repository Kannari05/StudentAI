package com.studentai.controller;

import com.studentai.dto.request.UserUpdateRequest;
import com.studentai.dto.response.AdminAnalyticsResponse;
import com.studentai.dto.response.UserResponse;
import com.studentai.model.Quiz;
import com.studentai.model.Progress;
import com.studentai.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin", description = "Admin panel APIs with role-based authorization")
public class AdminController {

    private final AdminService adminService;

    // User Management
    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Retrieve all users in the system")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieve a specific user by ID")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse user = adminService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{id}")
    @Operation(summary = "Update user", description = "Update user information")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserUpdateRequest request
    ) {
        UserResponse user = adminService.updateUser(id, request);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{id}")
    @Operation(summary = "Delete user", description = "Delete a user from the system")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Analytics
    @GetMapping("/analytics")
    @Operation(summary = "Get analytics", description = "Retrieve comprehensive platform analytics")
    public ResponseEntity<AdminAnalyticsResponse> getAnalytics() {
        AdminAnalyticsResponse analytics = adminService.getAnalytics();
        return ResponseEntity.ok(analytics);
    }

    // Quiz Management
    @GetMapping("/quizzes")
    @Operation(summary = "Get all quizzes", description = "Retrieve all quizzes in the system")
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = adminService.getAllQuizzes();
        return ResponseEntity.ok(quizzes);
    }

    @DeleteMapping("/quizzes/{id}")
    @Operation(summary = "Delete quiz", description = "Delete a quiz from the system")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        adminService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    // Algorithm Management (via Progress)
    @GetMapping("/progress")
    @Operation(summary = "Get all progress", description = "Retrieve all user progress records")
    public ResponseEntity<List<Progress>> getAllProgress() {
        List<Progress> progress = adminService.getAllProgress();
        return ResponseEntity.ok(progress);
    }
}
