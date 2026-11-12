
package com.commissaryos.backend.controller;

import com.commissaryos.backend.dto.CreateCommissaryRequest;
import com.commissaryos.backend.entity.Commissary;
import com.commissaryos.backend.service.CommissaryService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/commissaries")
public class CommissaryController {

    private final CommissaryService commissaryService;

    public CommissaryController(
            CommissaryService commissaryService
    ) {
        this.commissaryService = commissaryService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(
            @Valid @RequestBody CreateCommissaryRequest request
    ) {
        Commissary commissary =
            commissaryService.createCommissary(request.name());

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(Map.of(
                "id", commissary.getId(),
                "name", commissary.getName()
            ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(
            @PathVariable UUID id
    ) {
        Commissary commissary =
            commissaryService.getCommissary(id);

        return ResponseEntity.ok(Map.of(
            "id", commissary.getId(),
            "name", commissary.getName()
        ));
    }
}
