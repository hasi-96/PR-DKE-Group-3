package com.example.investionsverwaltungen.controller;

import com.example.investionsverwaltungen.model.Investition;
import com.example.investionsverwaltungen.sevice.InvestitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/investitionen")
public class InvestitionController {

    private final InvestitionService investitionService;

    @Autowired
    public InvestitionController(InvestitionService investitionService) {
        this.investitionService = investitionService;
    }

    @GetMapping
    public ResponseEntity<List<Investition>> getAllInvestitionen()  {
        List<Investition> invest = investitionService.getAllInvestitionen();
        return ResponseEntity.ok(invest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Investition> getInvestitionById(@PathVariable Long id) {
        Investition investition = investitionService.getInvestitionById(id);
        return ResponseEntity.ok(investition);
    }
    @PostMapping
    public ResponseEntity<Investition> createInvestition(@RequestBody Investition investition) {
        Investition createdInvestition = investitionService.createInvestition(investition);
        return new ResponseEntity<>(createdInvestition, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Investition> updateInvestition(@PathVariable Long id, @RequestBody Investition investitionDetails) {
        Investition updatedInvestition = investitionService.updateInvestition(id, investitionDetails);
        return ResponseEntity.ok(updatedInvestition);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvestition(@PathVariable Long id) {
        investitionService.deleteInvestition(id);
        return ResponseEntity.noContent().build();
    }

}



