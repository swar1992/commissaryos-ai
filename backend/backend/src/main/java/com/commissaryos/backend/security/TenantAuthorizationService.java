
package com.commissaryos.backend.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TenantAuthorizationService {

    public void verifyAccess(
            CommissaryUserPrincipal principal,
            UUID requestedCommissaryId) {

        if (principal == null) {
            throw new AccessDeniedException(
                    "Authentication required");
        }

        if ("PLATFORM_ADMIN".equals(principal.getRole())) {
            return;
        }

        UUID userCommissaryId = principal.getCommissaryId();

        if (userCommissaryId == null ||
                !userCommissaryId.equals(requestedCommissaryId)) {

            throw new AccessDeniedException(
                    "Access denied to this commissary");
        }
    }
}
