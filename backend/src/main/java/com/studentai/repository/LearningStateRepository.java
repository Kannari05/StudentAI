package com.studentai.repository;

import com.studentai.model.LearningState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LearningStateRepository
        extends JpaRepository<LearningState, Long> {

    Optional<LearningState> findByUserId(String userId);

    boolean existsByUserId(String userId);

    void deleteByUserId(String userId);
}