
package com.commissaryos.backend.service;

import com.commissaryos.backend.entity.Commissary;
import com.commissaryos.backend.entity.FoodTruck;
import com.commissaryos.backend.repository.CommissaryRepository;
import com.commissaryos.backend.repository.FoodTruckRepository;
import com.commissaryos.backend.exception.DuplicateLicenseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.commissaryos.backend.exception.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;

@Service
public class FoodTruckService {

    private final FoodTruckRepository foodTruckRepository;
    private final CommissaryRepository commissaryRepository;

    public FoodTruckService(
            FoodTruckRepository foodTruckRepository,
            CommissaryRepository commissaryRepository
    ) {
        this.foodTruckRepository = foodTruckRepository;
        this.commissaryRepository = commissaryRepository;
    }

    @Transactional
    public FoodTruck registerFoodTruck(
            UUID commissaryId,
            String businessName,
            String ownerName,
            String licenseNumber,
            String contactEmail
    ) {
        String validatedBusinessName =
            requireText(businessName, "Business name", 150);

        String validatedOwnerName =
            requireText(ownerName, "Owner name", 150);

        String validatedLicense =
            requireText(licenseNumber, "License number", 100);

        String validatedEmail =
            requireText(contactEmail, "Contact email", 255);

        if (!validatedEmail.matches(
                "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException(
                "Invalid contact email"
            );
        }

        if (commissaryId == null) {
            throw new IllegalArgumentException(
                "Commissary ID is required"
            );
        }

        Commissary commissary = commissaryRepository
                .findById(commissaryId)
              .orElseThrow(() -> new ResourceNotFoundException(
                  "Commissary not found: " + commissaryId
        ));

        if (foodTruckRepository
                .existsByCommissaryIdAndLicenseNumber(
                    commissaryId,
                    validatedLicense
                )) {
             throw new DuplicateLicenseException(
        "License number already registered"
    );
        }

        FoodTruck foodTruck = new FoodTruck(
            UUID.randomUUID(),
            commissary,
            validatedBusinessName,
            validatedOwnerName,
            validatedLicense,
            validatedEmail
        );

        return foodTruckRepository.save(foodTruck);
    }

    @Transactional(readOnly = true)
    public List<FoodTruck> getTrucksByCommissary(
            UUID commissaryId
    ) {
        if (commissaryId == null) {
            throw new IllegalArgumentException(
                "Commissary ID is required"
            );
        }

        return foodTruckRepository
            .findByCommissaryId(commissaryId);
    }

    @Transactional(readOnly = true)
    public FoodTruck getTruck(
            UUID commissaryId,
            UUID truckId
    ) {
        if (commissaryId == null || truckId == null) {
            throw new IllegalArgumentException(
                "Commissary ID and truck ID are required"
            );
        }

        return foodTruckRepository
            .findByIdAndCommissaryId(
                truckId,
                commissaryId
            )
           .orElseThrow(() ->
    new ResourceNotFoundException("Food truck not found")
);
    }

    private String requireText(
            String value,
            String fieldName,
            int maxLength
    ) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(
                fieldName + " is required"
            );
        }

        String trimmed = value.trim();

        if (trimmed.length() > maxLength) {
            throw new IllegalArgumentException(
                fieldName + " exceeds " +
                maxLength + " characters"
            );
        }

        return trimmed;
    }
}
