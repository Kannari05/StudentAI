package com.studentai.service;

import com.studentai.model.Quiz;
import com.studentai.model.QuizAttempt;
import com.studentai.repository.QuizAttemptRepository;
import com.studentai.repository.QuizRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @PostConstruct
    public void initSampleData() {
        if (quizRepository.count() == 0) {
            quizRepository.save(Quiz.builder()
                    .topic("Data Structures & Algorithms")
                    .difficulty("Medium")
                    .questionsJson(Arrays.asList(
                            "{\"id\":1,\"question\":\"What is the average time complexity of QuickSort?\",\"options\":[\"O(N)\",\"O(N log N)\",\"O(N^2)\",\"O(1)\"],\"correctAnswer\":1}",
                            "{\"id\":2,\"question\":\"Which data structure works on LIFO (Last In First Out)?\",\"options\":[\"Queue\",\"Stack\",\"Tree\",\"Graph\"],\"correctAnswer\":1}",
                            "{\"id\":3,\"question\":\"What is the worst-case space complexity of Depth First Search on a tree of height H?\",\"options\":[\"O(1)\",\"O(H)\",\"O(V+E)\",\"O(2^H)\"],\"correctAnswer\":1}"
                    ))
                    .build());

            quizRepository.save(Quiz.builder()
                    .topic("Java Fundamentals")
                    .difficulty("Easy")
                    .questionsJson(Arrays.asList(
                            "{\"id\":1,\"question\":\"Which keyword is used to inherit a class in Java?\",\"options\":[\"implements\",\"extends\",\"inherits\",\"using\"],\"correctAnswer\":1}",
                            "{\"id\":2,\"question\":\"What is the default value of a boolean variable in Java?\",\"options\":[\"true\",\"false\",\"null\",\"0\"],\"correctAnswer\":1}"
                    ))
                    .build());

            quizRepository.save(Quiz.builder()
                    .topic("React & Frontend Architecture")
                    .difficulty("Medium")
                    .questionsJson(Arrays.asList(
                            "{\"id\":1,\"question\":\"Which hook is used for side-effects in React?\",\"options\":[\"useState\",\"useContext\",\"useEffect\",\"useReducer\"],\"correctAnswer\":2}",
                            "{\"id\":2,\"question\":\"What is the purpose of React keys in lists?\",\"options\":[\"Styling\",\"State persistence\",\"Efficient DOM re-rendering\",\"Routing\"],\"correctAnswer\":2}"
                    ))
                    .build());
        }
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

    public QuizAttempt submitAttempt(Long userId, Long quizId, Integer correct, Integer total) {
        double score = ((double) correct / total) * 100.0;
        String feedback = score >= 70.0 ? "Great job! Strong mastery of concepts." : "Good effort! Review missed topics to boost accuracy.";

        QuizAttempt attempt = QuizAttempt.builder()
                .userId(userId)
                .quizId(quizId)
                .totalQuestions(total)
                .correctAnswers(correct)
                .scorePercentage(score)
                .feedback(feedback)
                .build();

        return quizAttemptRepository.save(attempt);
    }

    public List<QuizAttempt> getUserAttempts(Long userId) {
        return quizAttemptRepository.findByUserId(userId);
    }
}
