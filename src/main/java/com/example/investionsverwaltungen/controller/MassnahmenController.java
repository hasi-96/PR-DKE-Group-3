package com.example.investionsverwaltungen.controller;

import com.example.investionsverwaltungen.model.Massnahme;
import com.example.investionsverwaltungen.repository.MassnahmenRepository;
import com.example.investionsverwaltungen.sevice.MassnahmenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/massnahmen")
public class MassnahmenController {
    private final MassnahmenService massnahmenService;

    @Autowired
    private MassnahmenRepository massnahmeRepository;

    @Autowired
    MassnahmenController(MassnahmenService service){
        this.massnahmenService = service;
    }


    @GetMapping
    public ResponseEntity<List<Massnahme>> getAllMassnahmen()  {
        List<Massnahme> massnahme = massnahmenService.getAllMassnahmen();
        return ResponseEntity.ok(massnahme);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Massnahme> getMassnahmeById(@PathVariable Long id) {
        Massnahme massnahme = massnahmenService.getMassnahmeById(id);
        return ResponseEntity.ok(massnahme);
    }
    @PostMapping
    public ResponseEntity<Massnahme> createMassnahme(@RequestBody Massnahme investition) {
        Massnahme createdMassnahme = massnahmenService.createMassnahme(investition);
        return new ResponseEntity<>(createdMassnahme, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Massnahme> updateMassnahme(@PathVariable Long id, @RequestBody Massnahme massnahmeDetails) {
        Massnahme updatedMassnahme = massnahmenService.updateMassnahme(id, massnahmeDetails);
        return ResponseEntity.ok(updatedMassnahme);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMassnahme(@PathVariable Long id) {
        massnahmenService.deleteMassnahme(id);
        return ResponseEntity.noContent().build();
    }

}
