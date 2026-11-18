
// // loadUserByUsername() is called by Spring Security when someone authenticates using HTTP Basic.
// //
// // It retrieves the account from PostgreSQL and converts it into Spring Security's UserDetails representation.
// //
// // Notice that we don't compare passwords manually. Spring Security uses the configured PasswordEncoder to verify the submitted password against the stored BCrypt hash.
// //
// // Also, .roles(appUser.getRole()) automatically adds Spring Security's ROLE_ prefix. For example, COMMISSARY_ADMIN becomes ROLE_COMMISSARY_ADMIN.

// package com.commissaryos.backend.service;

// import com.commissaryos.backend.entity.AppUser;
// import com.commissaryos.backend.repository.AppUserRepository;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// @Service
// public class DatabaseUserDetailsService implements UserDetailsService {

//     private final AppUserRepository appUserRepository;

//     public DatabaseUserDetailsService(
//             AppUserRepository appUserRepository) {
//         this.appUserRepository = appUserRepository;
//     }

//     @Override
//     public UserDetails loadUserByUsername(String email)
//             throws UsernameNotFoundException {

//         AppUser appUser = appUserRepository
//                 .findByEmailIgnoreCase(email)
//                 .orElseThrow(() ->
//                         new UsernameNotFoundException(
//                                 "Invalid username or password"));

//         return User.withUsername(appUser.getEmail())
//                 .password(appUser.getPasswordHash())
//                 .roles(appUser.getRole())
//                 .disabled(!appUser.isActive())
//                 .build();
//     }
// }


package com.commissaryos.backend.service;

import com.commissaryos.backend.entity.AppUser;
import com.commissaryos.backend.repository.AppUserRepository;
import com.commissaryos.backend.security.CommissaryUserPrincipal;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DatabaseUserDetailsService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    public DatabaseUserDetailsService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        AppUser appUser = appUserRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Invalid username or password"
                        )
                );

        return new CommissaryUserPrincipal(appUser);
    }
}
