package com.studentai.repository;

import com.studentai.model.DSASolution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DSASolutionRepository extends JpaRepository<DSASolution, Long> {
    List<DSASolution> findByUserId(Long userId);
    List<DSASolution> findByUserIdAndAlgorithmId(Long userId, Long algorithmId);
}
