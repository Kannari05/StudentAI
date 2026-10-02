package com.studentai.service;

import com.studentai.dto.request.UserUpdateRequest;
import com.studentai.dto.response.AdminAnalyticsResponse;
import com.studentai.dto.response.UserResponse;
import com.studentai.model.Progress;
import com.studentai.model.Quiz;
import com.studentai.model.User;
import com.studentai.repository.ProgressRepository;
import com.studentai.repository.QuizRepository;
import com.studentai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final ProgressRepository progressRepository;

    // User Management
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToUserResponse(user);
    }

    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }
        if (request.getEnabled() != null) {
            user.setEnabled(request.getEnabled());
        }

        user = userRepository.save(user);
        return mapToUserResponse(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Prevent deleting the last admin
        long adminCount = userRepository.countByRole("ADMIN");
        if (user.getRole().equals("ADMIN") && adminCount <= 1) {
            throw new RuntimeException("Cannot delete the last admin user");
        }

        userRepository.deleteById(id);
    }

    // Analytics
    public AdminAnalyticsResponse getAnalytics() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByEnabledTrue();
        long totalQuizzes = quizRepository.count();
        long totalAlgorithms = progressRepository.findAll().stream()
                .mapToInt(Progress::getAlgorithmsCompleted)
                .sum();
        long totalDocuments = 0; // TODO: Implement document tracking
        long totalCodeReviews = 0; // TODO: Implement code review tracking

        // User growth (last 30 days)
        Map<String, Long> userGrowth = new LinkedHashMap<>();
        for (int i = 29; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            String dateKey = date.toString();
            long count = userRepository.countByCreatedAtBetween(
                    date.atStartOfDay(),
                    date.plusDays(1).atStartOfDay()
            );
            userGrowth.put(dateKey, count);
        }

        // Quiz attempts (last 30 days)
        Map<String, Long> quizAttempts = new LinkedHashMap<>();
        for (int i = 29; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            String dateKey = date.toString();
            // TODO: Implement quiz attempt tracking
            quizAttempts.put(dateKey, 0L);
        }

        // Algorithm completions (last 30 days)
        Map<String, Long> algorithmCompletions = new LinkedHashMap<>();
        List<Progress> allProgress = progressRepository.findAll();
        for (int i = 29; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            String dateKey = date.toString();
            long count = allProgress.stream()
                    .filter(progress -> progress.getDate() != null
                            && !progress.getDate().isBefore(date)
                            && !progress.getDate().isAfter(date))
                    .mapToInt(Progress::getAlgorithmsCompleted)
                    .sum();
            algorithmCompletions.put(dateKey, count);
        }

        // Study hours (last 30 days)
        Map<String, Long> studyHours = new LinkedHashMap<>();
        for (int i = 29; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            String dateKey = date.toString();
            long minutes = allProgress.stream()
                    .filter(progress -> progress.getDate() != null
                            && !progress.getDate().isBefore(date)
                            && !progress.getDate().isAfter(date))
                    .mapToInt(Progress::getStudyMinutes)
                    .sum();
            studyHours.put(dateKey, minutes / 60);
        }

        return AdminAnalyticsResponse.builder()
                .totalUsers(totalUsers)
                .activeUsers(activeUsers)
                .totalQuizzes(totalQuizzes)
                .totalAlgorithms(totalAlgorithms)
                .totalDocuments(totalDocuments)
                .totalCodeReviews(totalCodeReviews)
                .userGrowth(userGrowth)
                .quizAttempts(quizAttempts)
                .algorithmCompletions(algorithmCompletions)
                .studyHours(studyHours)
                .build();
    }

    // Quiz Management
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Transactional
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    // Algorithm Management (via Progress)
    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .enabled(user.getEnabled())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
