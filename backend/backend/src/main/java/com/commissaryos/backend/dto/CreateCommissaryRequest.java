//carry data between the client and server.

package com.commissaryos.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateCommissaryRequest(

    @NotBlank(message = "Commissary name is required")
    @Size(
        max = 150,
        message = "Commissary name must not exceed 150 characters"
    )
    String name

) {
}
