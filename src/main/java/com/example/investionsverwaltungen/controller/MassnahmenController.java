package com.example.investionsverwaltungen.controller;

import com.example.investionsverwaltungen.model.Massnahme;
import com.example.investionsverwaltungen.sevice.MassnahmenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * Der {@code MassnahmeController} ist eine REST Controller-Klasse, die HTTP-Anfragen
 * für die Verwaltung von Maßnahmen im System verarbeitet. Sie bietet Endpunkte zum Erstellen,
 * Abrufen, Aktualisieren und Löschen von Maßnahmen.
 * Dieser Controller ermöglicht die Interaktion mit Maßnahmen über eine RESTful API und
 * verwendet {@link MassnahmenService}, um die Geschäftslogikoperationen auszuführen.
 * Cross-Origin Resource Sharing (CORS) ist für Anfragen von "http://localhost:4200"
 * aktiviert, was die Nutzung dieser API von einer Frontend-Anwendung, die auf diesem Host läuft,
 * erleichtert.
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/massnahme")
public class MassnahmenController {

    private final MassnahmenService massnahmenService;

    public MassnahmenController(MassnahmenService massnahmenService) {
        this.massnahmenService = massnahmenService;
    }

    @GetMapping
    public ResponseEntity<List<Massnahme>> getAllMassnahmen() {
        List<Massnahme> massnahme = massnahmenService.getAllMassnahmen();
        return ResponseEntity.ok(massnahme);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Massnahme> getMassnahmeById(@PathVariable Long id) {
        Massnahme massnahme = massnahmenService.getMassnahmeById(id);
        return ResponseEntity.ok(massnahme);
    }

    @PostMapping
    public ResponseEntity<Massnahme> createMassnahme(@RequestBody Massnahme massnahme) {
        Massnahme createdMassnahme = massnahmenService.createMassnahme(massnahme);
        return new ResponseEntity<>(createdMassnahme, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Massnahme> updateMassnahme(@RequestBody Massnahme massnahme) {
        Massnahme updatedMassnahme = massnahmenService.updateMassnahme(massnahme.getId(), massnahme);
        return ResponseEntity.ok(updatedMassnahme);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMassnahme(@PathVariable Long id) {
        massnahmenService.deleteMassnahme(id);
        return ResponseEntity.noContent().build();
    }
}