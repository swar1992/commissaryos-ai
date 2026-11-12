
package com.commissaryos.backend.repository;

import com.commissaryos.backend.entity.FoodTruck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FoodTruckRepository
        extends JpaRepository<FoodTruck, UUID> {

    List<FoodTruck> findByCommissaryId(
            UUID commissaryId
    );

    Optional<FoodTruck> findByIdAndCommissaryId(
            UUID id,
            UUID commissaryId
    );

    boolean existsByCommissaryIdAndLicenseNumber(
            UUID commissaryId,
            String licenseNumber
    );
}
