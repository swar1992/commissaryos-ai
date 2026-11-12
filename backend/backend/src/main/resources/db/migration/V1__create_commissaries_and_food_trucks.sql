
-- V1: Initial CommissaryOS AI database schema

CREATE TABLE commissaries (
    id UUID PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE food_trucks (
    id UUID PRIMARY KEY,

    commissary_id UUID NOT NULL,

    business_name VARCHAR(150) NOT NULL,
    owner_name VARCHAR(150) NOT NULL,
    license_number VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,

    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_food_trucks_commissary
        FOREIGN KEY (commissary_id)
        REFERENCES commissaries(id),

    CONSTRAINT uq_food_trucks_license_per_commissary
        UNIQUE (commissary_id, license_number)
);

CREATE INDEX idx_food_trucks_commissary_id
    ON food_trucks(commissary_id);
