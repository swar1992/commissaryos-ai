
package com.commissaryos.backend.controller;

import com.commissaryos.backend.dto.CreateFoodTruckRequest;
import com.commissaryos.backend.entity.FoodTruck;
import com.commissaryos.backend.service.FoodTruckService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/commissaries/{commissaryId}/food-trucks")
public class FoodTruckController {

    private final FoodTruckService foodTruckService;

    public FoodTruckController(
            FoodTruckService foodTruckService
    ) {
        this.foodTruckService = foodTruckService;
    }

    @PostMapping
    public ResponseEntity<FoodTruckResponse> register(
            @PathVariable UUID commissaryId,
            @Valid @RequestBody CreateFoodTruckRequest request
    ) {
        FoodTruck truck = foodTruckService.registerFoodTruck(
            commissaryId,
            request.businessName(),
            request.ownerName(),
            request.licenseNumber(),
            request.contactEmail()
        );

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(toResponse(truck));
    }

    @GetMapping
    public List<FoodTruckResponse> getAll(
            @PathVariable UUID commissaryId
    ) {
        return foodTruckService
            .getTrucksByCommissary(commissaryId)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    @GetMapping("/{truckId}")
    public FoodTruckResponse getById(
            @PathVariable UUID commissaryId,
            @PathVariable UUID truckId
    ) {
        FoodTruck truck = foodTruckService.getTruck(
            commissaryId,
            truckId
        );

        return toResponse(truck);
    }

    private FoodTruckResponse toResponse(FoodTruck truck) {
        return new FoodTruckResponse(
            truck.getId(),
            truck.getCommissary().getId(),
            truck.getBusinessName(),
            truck.getOwnerName(),
            truck.getLicenseNumber(),
            truck.getContactEmail(),
            truck.isActive()
        );
    }

    public record FoodTruckResponse(
        UUID id,
        UUID commissaryId,
        String businessName,
        String ownerName,
        String licenseNumber,
        String contactEmail,
        boolean active
    ) {}
}
