package com.studentai.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OtpRequest {

    @NotBlank(message = "Email or phone number is required")
    @jakarta.validation.constraints.Email(message = "Enter a valid email address")
    @jakarta.validation.constraints.Size(max = 254)
    private String identifier;
}