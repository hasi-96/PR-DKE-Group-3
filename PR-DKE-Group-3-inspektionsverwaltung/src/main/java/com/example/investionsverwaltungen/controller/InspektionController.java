package com.example.inspektionsverwaltungen.controller;

import com.example.inspektionsverwaltungen.entity.Inspektion;
import com.example.inspektionsverwaltungen.sevice.InspektionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/inspektionen")
public class InspektionController {

    private final InspektionService inspektionService;

    @Autowired
    public InspektionController(InspektionService inspektionService) {
        this.inspektionService = inspektionService;
    }

    @GetMapping
    public List<Inspektion> getAllInspektionen() {
        return inspektionService.getAllInspektionen();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inspektion> getInspektionById(@PathVariable Long id) {
        return ResponseEntity.ok(inspektionService.getInspektionById(id));
    }

    @PostMapping
    public Inspektion createInspektion(@RequestBody Inspektion inspektion) {
        return inspektionService.createInspektion(inspektion);
    }

    @PutMapping("/{id}")
    public Inspektion updateInspektion(@PathVariable Long id, @RequestBody Inspektion inspektionDetails) {
        return inspektionService.updateInspektion(id, inspektionDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInspektion(@PathVariable Long id) {
        inspektionService.deleteInspektion(id);
        return ResponseEntity.ok().build();
    }
}



