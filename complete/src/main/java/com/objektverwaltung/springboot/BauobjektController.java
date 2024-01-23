package com.objektverwaltung.springboot;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.beans.factory.annotation.Autowired;


@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/bauobjekt")
public class BauobjektController {

    // Inject your service or repository here
    @Autowired
    private JdbcTemplate jdbcTemplate;

    //@CrossOrigin(origins = "http://localhost:4200")
    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
    @GetMapping
    public ResponseEntity<?> getAllBauobjekts() {
        try {
            String sql = "SELECT * FROM bauobjekte";
            List<Bauobjekt> bauobjekte = jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Bauobjekt.class));

            return ResponseEntity.ok(bauobjekte);
        }
        catch(Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public ResponseEntity<?> addBauobjekt(@RequestBody Bauobjekt bauobjekt) {
        try {
                    SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate)
                    .withTableName("bauobjekte")
                    .usingGeneratedKeyColumns("id");

            MapSqlParameterSource parameters = new MapSqlParameterSource()
                    .addValue("name", bauobjekt.getName())
                    .addValue("bwtyp", bauobjekt.getBwtyp())
                    .addValue("status", bauobjekt.getStatus())
                    .addValue("baujahr", bauobjekt.getBaujahr())
                    .addValue("standort", bauobjekt.getStandort());

            Number key = jdbcInsert.executeAndReturnKey(parameters);

            return ResponseEntity.ok(key);
        }
        catch(Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping
    public ResponseEntity<?> editBauobjekt(@RequestBody Bauobjekt bauobjekt) {
        try {
            bauobjekt.ReplaceNullValue();
            jdbcTemplate.update("UPDATE bauobjekte SET name = ?, bwtyp = ?, status = ?, baujahr = ?, standort = ? WHERE id = ?", bauobjekt.getName(), bauobjekt.getBwtyp(), bauobjekt.getStatus(), bauobjekt.getBaujahr(), bauobjekt.getStandort(), bauobjekt.getID());
            return ResponseEntity.ok().build();
        }
        catch(Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBauobjektById(@PathVariable int id) {
        String sql = "SELECT * FROM bauobjekte WHERE id=" + id;
        try {
            List<Bauobjekt> bauobjekte = jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Bauobjekt.class));
            if (bauobjekte.size() == 1)
                return ResponseEntity.ok(bauobjekte.get(0));
            else
            {
                return ResponseEntity.badRequest().body("No single Bauobjekt found!");
            }
        }
        catch(Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBauobjekt(@PathVariable int id) {
        String sql = "DELETE FROM bauobjekte_komponenten WHERE bo_id = ?";
        jdbcTemplate.update(sql, id);

        sql = "DELETE FROM bauobjekte WHERE id = ?";
        int rowDeleted = jdbcTemplate.update(sql, id);

        if (rowDeleted > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("No elements deleted!");
        }
    }
}
