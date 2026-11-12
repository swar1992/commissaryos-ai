
package com.commissaryos.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateFoodTruckRequest(

    @NotBlank(message = "Business name is required")
    @Size(max = 150)
    String businessName,

    @NotBlank(message = "Owner name is required")
    @Size(max = 150)
    String ownerName,

    @NotBlank(message = "License number is required")
    @Size(max = 100)
    String licenseNumber,

    @NotBlank(message = "Contact email is required")
    @Email(message = "Invalid email address")
    @Size(max = 255)
    String contactEmail

) {
}
