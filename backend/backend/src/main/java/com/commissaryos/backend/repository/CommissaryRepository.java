
package com.commissaryos.backend.repository;

import com.commissaryos.backend.entity.Commissary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommissaryRepository
        extends JpaRepository<Commissary, UUID> {
}
