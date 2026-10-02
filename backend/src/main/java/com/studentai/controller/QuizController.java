package com.studentai.controller;

import com.studentai.model.Quiz;
import com.studentai.model.QuizAttempt;
import com.studentai.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping
    public ResponseEntity<List<Quiz>> getQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getQuizById(id));
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizAttempt> submitAttempt(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId,
            @RequestBody Map<String, Object> payload) {
        Long quizId = Long.valueOf(payload.get("quizId").toString());
        Integer correct = Integer.valueOf(payload.get("correctAnswers").toString());
        Integer total = Integer.valueOf(payload.get("totalQuestions").toString());
        return ResponseEntity.ok(quizService.submitAttempt(userId, quizId, correct, total));
    }

    @GetMapping("/attempts")
    public ResponseEntity<List<QuizAttempt>> getUserAttempts(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId) {
        return ResponseEntity.ok(quizService.getUserAttempts(userId));
    }
}
