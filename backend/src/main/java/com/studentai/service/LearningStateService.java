package com.studentai.service;

import com.studentai.model.LearningState;
import com.studentai.repository.LearningStateRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LearningStateService {

    private final LearningStateRepository learningStateRepository;

    public LearningStateService(
            LearningStateRepository learningStateRepository) {

        this.learningStateRepository = learningStateRepository;
    }

    // Get student's current learning position
    public LearningState getState(String userId) {

        return learningStateRepository
                .findByUserId(userId)
                .orElseGet(() -> createDefaultState(userId));
    }

    // Save student's current learning position
    @Transactional
    public LearningState saveState(
            String userId,
            LearningState state) {

        LearningState existing =
                learningStateRepository
                        .findByUserId(userId)
                        .orElse(null);

        if (existing == null) {

            state.setId(null);
            state.setUserId(userId);

            if (state.getCurrentLesson() == null) {
                state.setCurrentLesson(1);
            }

            if (state.getCurrentQuestion() == null) {
                state.setCurrentQuestion(1);
            }

            if (state.getCompletionPercentage() == null) {
                state.setCompletionPercentage(0);
            }

            return learningStateRepository.save(state);
        }

        existing.setCurrentCourse(
                state.getCurrentCourse()
        );

        existing.setCurrentTopic(
                state.getCurrentTopic()
        );

        existing.setCurrentLesson(
                state.getCurrentLesson()
        );

        existing.setCurrentQuestion(
                state.getCurrentQuestion()
        );

        existing.setCompletionPercentage(
                state.getCompletionPercentage()
        );

        return learningStateRepository.save(existing);
    }

    private LearningState createDefaultState(String userId) {

        return LearningState.builder()
                .userId(userId)
                .currentCourse("DSA")
                .currentTopic("Arrays")
                .currentLesson(1)
                .currentQuestion(1)
                .completionPercentage(0)
                .build();
    }
}