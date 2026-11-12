
package com.commissaryos.backend.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "food_trucks")
public class FoodTruck {

    @Id
    @Column(name = "id", nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "commissary_id", nullable = false)
    private Commissary commissary;

    @Column(name = "business_name", nullable = false, length = 150)
    private String businessName;

    @Column(name = "owner_name", nullable = false, length = 150)
    private String ownerName;

    @Column(name = "license_number", nullable = false, length = 100)
    private String licenseNumber;

    @Column(name = "contact_email", nullable = false, length = 255)
    private String contactEmail;

    @Column(name = "active", nullable = false)
    private boolean active = true;

    @Column(
        name = "created_at",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private OffsetDateTime createdAt;

    protected FoodTruck() {
        // Required by JPA
    }

    public FoodTruck(
            UUID id,
            Commissary commissary,
            String businessName,
            String ownerName,
            String licenseNumber,
            String contactEmail
    ) {
        this.id = id;
        this.commissary = commissary;
        this.businessName = businessName;
        this.ownerName = ownerName;
        this.licenseNumber = licenseNumber;
        this.contactEmail = contactEmail;
        this.active = true;
    }

    public UUID getId() {
        return id;
    }

    public Commissary getCommissary() {
        return commissary;
    }

    public String getBusinessName() {
        return businessName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public boolean isActive() {
        return active;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}
