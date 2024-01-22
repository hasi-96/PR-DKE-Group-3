package com.example.investionsverwaltungen.controller;

import com.example.investionsverwaltungen.entity.Investition;
import com.example.investionsverwaltungen.sevice.InvestitionService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Investition> getAllInvestitionen() {
        return investitionService.getAllInvestitionen();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Investition> getInvestitionById(@PathVariable Long id) {
        return ResponseEntity.ok(investitionService.getInvestitionById(id));
    }

    @PostMapping
    public Investition createInvestition(@RequestBody Investition investition) {
        return investitionService.createInvestition(investition);
    }

    @PutMapping("/{id}")
    public Investition updateInvestition(@PathVariable Long id, @RequestBody Investition investitionDetails) {
        return investitionService.updateInvestition(id, investitionDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvestition(@PathVariable Long id) {
        investitionService.deleteInvestition(id);
        return ResponseEntity.ok().build();
    }
}



