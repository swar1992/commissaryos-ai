
package com.commissaryos.backend.security;

import com.commissaryos.backend.entity.AppUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class CommissaryUserPrincipal implements UserDetails {

    private final UUID userId;
    private final UUID commissaryId;
    private final String email;
    private final String passwordHash;
    private final String role;
    private final boolean active;

    public CommissaryUserPrincipal(AppUser user) {
        this.userId = user.getId();
        this.commissaryId = user.getCommissaryId();
        this.email = user.getEmail();
        this.passwordHash = user.getPasswordHash();
        this.role = user.getRole();
        this.active = user.isActive();
    }

    public UUID getUserId() {
        return userId;
    }

    public UUID getCommissaryId() {
        return commissaryId;
    }

    public String getRole() {
        return role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
