package com.studentai.repository;

import com.studentai.model.Algorithm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlgorithmRepository extends JpaRepository<Algorithm, Long> {
    List<Algorithm> findByCategory(String category);
    List<Algorithm> findByDifficulty(String difficulty);
}
