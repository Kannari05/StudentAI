package com.studentai.service;

import com.studentai.model.Progress;
import com.studentai.repository.ProgressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    // ============================================================
    // GET TODAY'S PROGRESS
    // ============================================================

    public Progress getTodayProgress(Long userId) {

        return progressRepository
                .findByUserIdAndDate(userId, LocalDate.now())
                .orElseGet(() -> createDefaultProgress(userId));
    }

    // ============================================================
    // GET ALL USER PROGRESS
    // ============================================================

    public List<Progress> getUserProgress(Long userId) {

        return progressRepository
                .findByUserIdOrderByDateDesc(userId);
    }

    // ============================================================
    // SAVE / UPDATE TODAY'S PROGRESS
    // ============================================================

    @Transactional
    public Progress saveProgress(
            Long userId,
            Progress progress) {

        LocalDate today = LocalDate.now();

        Progress existing = progressRepository
                .findByUserIdAndDate(userId, today)
                .orElse(null);

        // ========================================================
        // CREATE NEW PROGRESS
        // ========================================================

        if (existing == null) {

            Progress newProgress = new Progress();

            newProgress.setUserId(userId);
            newProgress.setDate(today);

            newProgress.setAlgorithmsCompleted(
                    progress.getAlgorithmsCompleted() != null
                            ? progress.getAlgorithmsCompleted()
                            : 0
            );

            newProgress.setQuizScore(
                    progress.getQuizScore() != null
                            ? progress.getQuizScore()
                            : 0
            );

            newProgress.setStudyMinutes(
                    progress.getStudyMinutes() != null
                            ? progress.getStudyMinutes()
                            : 0
            );

            newProgress.setWeakTopics(
                    progress.getWeakTopics() != null
                            ? progress.getWeakTopics()
                            : "[]"
            );

            newProgress.setStrongTopics(
                    progress.getStrongTopics() != null
                            ? progress.getStrongTopics()
                            : "[]"
            );

            newProgress.setDailyStreak(
                    progress.getDailyStreak() != null
                            ? progress.getDailyStreak()
                            : 0
            );

            return progressRepository.save(newProgress);
        }

        // ========================================================
        // UPDATE EXISTING PROGRESS
        // ========================================================

        if (progress.getAlgorithmsCompleted() != null) {
            existing.setAlgorithmsCompleted(
                    progress.getAlgorithmsCompleted()
            );
        }

        if (progress.getQuizScore() != null) {
            existing.setQuizScore(
                    progress.getQuizScore()
            );
        }

        if (progress.getStudyMinutes() != null) {
            existing.setStudyMinutes(
                    progress.getStudyMinutes()
            );
        }

        if (progress.getWeakTopics() != null) {
            existing.setWeakTopics(
                    progress.getWeakTopics()
            );
        }

        if (progress.getStrongTopics() != null) {
            existing.setStrongTopics(
                    progress.getStrongTopics()
            );
        }

        if (progress.getDailyStreak() != null) {
            existing.setDailyStreak(
                    progress.getDailyStreak()
            );
        }

        return progressRepository.save(existing);
    }

    // ============================================================
    // CREATE DEFAULT PROGRESS
    // ============================================================

    private Progress createDefaultProgress(Long userId) {

        Progress progress = new Progress();

        progress.setUserId(userId);
        progress.setDate(LocalDate.now());

        progress.setAlgorithmsCompleted(0);
        progress.setQuizScore(0);
        progress.setStudyMinutes(0);

        progress.setWeakTopics("[]");
        progress.setStrongTopics("[]");

        progress.setDailyStreak(0);

        return progress;
    }
}