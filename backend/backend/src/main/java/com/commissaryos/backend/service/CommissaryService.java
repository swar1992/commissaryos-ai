
package com.commissaryos.backend.service;

import com.commissaryos.backend.entity.Commissary;
import com.commissaryos.backend.repository.CommissaryRepository;
import com.commissaryos.backend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class CommissaryService {

    private final CommissaryRepository commissaryRepository;

    public CommissaryService(
            CommissaryRepository commissaryRepository
    ) {
        this.commissaryRepository = commissaryRepository;
    }

    @Transactional
    public Commissary createCommissary(String name) {

        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException(
                "Commissary name is required"
            );
        }

        Commissary commissary = new Commissary(
            UUID.randomUUID(),
            name.trim()
        );

        return commissaryRepository.save(commissary);
    }

    @Transactional(readOnly = true)
    public Commissary getCommissary(UUID id) {

        return commissaryRepository.findById(id)
        .orElseThrow(() ->
            new ResourceNotFoundException(
                "Commissary not found: " + id
            )
        );
    }
}
