package com.objektverwaltung.springboot;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/bauwerkkomponente")
public class BauwerkKomponenteController {

    // Inject your service or repository here
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{bauobjektID}")
    public ResponseEntity<?> getBauwerkKomponenten(@PathVariable int bauobjektID) {
        try {
            String sql = "SELECT BauwerkKomponente FROM bauobjekte_komponenten WHERE bo_id=" + bauobjektID;
            List<String> bauwerkKomponenten = jdbcTemplate.queryForList(sql, String.class);

            return ResponseEntity.ok(bauwerkKomponenten);
        }
        catch(Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/{bauobjektID}")
    public ResponseEntity<?> addBauwerkKomponente(@PathVariable int bauobjektID, @RequestBody String bauwerkKomponente) {
        int rowsAffected = jdbcTemplate.update("INSERT INTO bauobjekte_komponenten(bo_id, bauwerkkomponente) VALUES(?,?)", bauobjektID, bauwerkKomponente);

        if (rowsAffected > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("No elements affected!");
        }
    }


    //@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{bauobjektID}/{BauwerkKomponentenTyp}")
    public ResponseEntity<?> deleteBauobjekt(@PathVariable int bauobjektID, @PathVariable String BauwerkKomponentenTyp) {
        String sql = "DELETE FROM bauobjekte_komponenten WHERE bo_id = ? AND bauwerkkomponente = ?";
        int rowsAffected = jdbcTemplate.update(sql, bauobjektID, BauwerkKomponentenTyp);

        if (rowsAffected > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("No elements deleted!");
        }
    }
}
