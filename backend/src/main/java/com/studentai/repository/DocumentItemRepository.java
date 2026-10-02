package com.studentai.repository;

import com.studentai.model.DocumentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentItemRepository extends JpaRepository<DocumentItem, Long> {
    List<DocumentItem> findByUserId(Long userId);
}
