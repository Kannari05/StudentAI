package com.studentai.repository;

import com.studentai.model.StudySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StudySessionRepository extends JpaRepository<StudySession, Long> {

    List<StudySession> findByUserIdOrderByStartTimeDesc(String userId);

    @Query("SELECT s FROM StudySession s WHERE s.userId = :userId AND s.startTime >= :startDate AND s.startTime <= :endDate ORDER BY s.startTime ASC")
    List<StudySession> findByUserIdAndStartTimeBetween(@Param("userId") String userId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT SUM(s.durationMinutes) FROM StudySession s WHERE s.userId = :userId AND s.startTime >= :startDate AND s.startTime <= :endDate")
    Integer getTotalStudyMinutesByUserAndDateRange(@Param("userId") String userId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COUNT(s) FROM StudySession s WHERE s.userId = :userId AND s.activityType = :activityType AND s.startTime >= :startDate AND s.startTime <= :endDate")
    Long countByUserIdAndActivityTypeAndDateRange(@Param("userId") String userId, @Param("activityType") String activityType, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    void deleteByUserIdAndId(String userId, Long id);
}
