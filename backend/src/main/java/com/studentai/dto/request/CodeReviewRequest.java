package com.studentai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeReviewRequest {

    @NotBlank(message = "Code is required")
    private String code;

    @NotNull(message = "Language is required")
    @Pattern(regexp = "JAVA|PYTHON|CPP|JAVASCRIPT", message = "Language must be JAVA, PYTHON, CPP, or JAVASCRIPT")
    private String language;
}
