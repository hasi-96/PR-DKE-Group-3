package com.objektverwaltung.springboot;

public class Bauobjekt {
    private int id;
    private String name;
    private String bwtyp;
    private String status;
    private int baujahr;
    private String standort;

    // Constructor without parameters
    public Bauobjekt() {
    }

    // Constructor with parameters
    public Bauobjekt(int id, String name, String bwtyp, String status, int baujahr, String standort) {
        this.id = id;
        this.name = name;
        this.bwtyp = bwtyp;
        this.status = status;
        this.baujahr = baujahr;
        this.standort = standort;
    }

    public void ReplaceNullValue()
    {
        if (name == null) name = "";
        if (bwtyp == null) bwtyp = "";
        if (status == null) status = "";
        if (standort == null) standort = "";
    }

    // Getters
    public int getID() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBwtyp() {
        return bwtyp;
    }

    public String getStatus() {
        return status;
    }

    public int getBaujahr() {
        return baujahr;
    }

    public String getStandort() {
        return standort;
    }

    // Setters
    public void setID(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBwtyp(String bwtyp) {
        this.bwtyp = bwtyp;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setBaujahr(int baujahr) {
        this.baujahr = baujahr;
    }

    public void setStandort(String standort) {
        this.standort = standort;
    }
}

