package com.studentai.repository;

import com.studentai.model.CodeReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeReviewRepository extends JpaRepository<CodeReview, Long> {

    List<CodeReview> findByUserIdOrderByCreatedAtDesc(String userId);

    void deleteByUserIdAndId(String userId, Long id);
}
