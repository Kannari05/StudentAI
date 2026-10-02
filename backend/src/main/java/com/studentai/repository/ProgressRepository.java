package com.studentai.repository;

import com.studentai.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {

    Optional<Progress> findByUserIdAndDate(
            Long userId,
            LocalDate date
    );

    List<Progress> findByUserIdOrderByDateDesc(
            Long userId
    );

    @Query("""
            SELECT p
            FROM Progress p
            WHERE p.userId = :userId
            AND p.date >= :startDate
            AND p.date <= :endDate
            ORDER BY p.date ASC
            """)
    List<Progress> findByUserIdAndDateBetween(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    void deleteByUserIdAndId(
            Long userId,
            Long id
    );
}