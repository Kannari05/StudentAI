package com.studentai.controller;

import com.studentai.dto.request.CodeReviewRequest;
import com.studentai.dto.response.CodeReviewResponse;
import com.studentai.model.CodeReview;
import com.studentai.service.CodeReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/code-review")
@RequiredArgsConstructor
@Tag(name = "Code Review", description = "AI-powered code review APIs")
public class CodeReviewController {

    private final CodeReviewService codeReviewService;

    @PostMapping("/review")
    @Operation(summary = "Review code", description = "Submit code for AI-powered review")
    public ResponseEntity<CodeReviewResponse> reviewCode(
            @RequestBody CodeReviewRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        CodeReviewResponse response = codeReviewService.reviewCode(request, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    @Operation(summary = "Get code review history", description = "Retrieve all code reviews for the authenticated user")
    public ResponseEntity<List<CodeReview>> getCodeReviewHistory(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<CodeReview> reviews = codeReviewService.getUserCodeReviews(userDetails.getUsername());
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/{reviewId}")
    @Operation(summary = "Get code review", description = "Retrieve a specific code review")
    public ResponseEntity<CodeReview> getCodeReview(
            @PathVariable Long reviewId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        CodeReview review = codeReviewService.getCodeReview(reviewId, userDetails.getUsername());
        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/{reviewId}")
    @Operation(summary = "Delete code review", description = "Delete a specific code review")
    public ResponseEntity<Void> deleteCodeReview(
            @PathVariable Long reviewId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        codeReviewService.deleteCodeReview(reviewId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
