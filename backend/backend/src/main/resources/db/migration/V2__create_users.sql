
CREATE TABLE app_users (
    id UUID PRIMARY KEY,
    commissary_id UUID REFERENCES commissaries(id),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_app_users_role
        CHECK (role IN (
            'COMMISSARY_ADMIN',
            'TRUCK_OPERATOR',
            'PLATFORM_ADMIN'
        ))
);

CREATE INDEX idx_app_users_commissary_id
    ON app_users(commissary_id);
