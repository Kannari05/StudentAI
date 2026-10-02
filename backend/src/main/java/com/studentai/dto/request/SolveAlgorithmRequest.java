package com.studentai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SolveAlgorithmRequest {
    @NotNull
    private Long algorithmId;

    @NotBlank
    private String code;

    @NotBlank
    private String language;
}
