package com.example.inspektionsverwaltungen.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.AUTO;

@Entity
@Table(name = "Inspektion")
@AllArgsConstructor
@NoArgsConstructor
public class Inspektion {
    @Id
    @GeneratedValue(strategy = AUTO)
    long inspektionsID;
    @Column
    long massnahmeID;
    @Column
    int jahr;
    @Column
    double kosten;
    @Column
    String anmerkung;

    public long getInspektionsID() {
        return inspektionsID;
    }

    public void setInspektionsID(long inspektionsID) {
        this.inspektionsID = inspektionsID;
    }

    public long getMassnahmeID() {
        return massnahmeID;
    }

    public void setMaßnahmeID(long maßnahmeID) {
        this.massnahmeID = maßnahmeID;
    }

    public int getJahr() {
        return jahr;
    }

    public void setJahr(int jahr) {
        this.jahr = jahr;
    }

    public double getKosten() {
        return kosten;
    }

    public void setKosten(double kosten) {
        this.kosten = kosten;
    }

    public String getAnmerkung() {
        return anmerkung;
    }

    public void setAnmerkung(String anmerkung) {
        this.anmerkung = anmerkung;
    }
}
