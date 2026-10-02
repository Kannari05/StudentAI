package com.studentai.controller;

import com.studentai.dto.request.SolveAlgorithmRequest;
import com.studentai.model.Algorithm;
import com.studentai.model.DSASolution;
import com.studentai.service.DSAService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dsa")
@CrossOrigin(origins = "*")
public class DSAController {

    @Autowired
    private DSAService dsaService;

    @GetMapping("/algorithms")
    public ResponseEntity<List<Algorithm>> getAlgorithms() {
        return ResponseEntity.ok(dsaService.getAllAlgorithms());
    }

    @GetMapping("/algorithms/{id}")
    public ResponseEntity<Algorithm> getAlgorithmById(@PathVariable Long id) {
        return ResponseEntity.ok(dsaService.getAlgorithmById(id));
    }

    @PostMapping("/solve")
    public ResponseEntity<DSASolution> submitSolution(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId,
            @Valid @RequestBody SolveAlgorithmRequest request) {
        return ResponseEntity.ok(dsaService.submitSolution(userId, request));
    }
}
