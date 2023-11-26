package com.example.investionsverwaltungen.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.AUTO;

@Entity
@Table(name = "Investition")
@AllArgsConstructor
@NoArgsConstructor
public class Investition {
    @Id
    @GeneratedValue(strategy = AUTO)
    long investitionsID;
    @Column
    long massnahmeID;
    @Column
    int jahr;
    @Column
    double kosten;
    @Column
    String anmerkung;

    public long getInvestitionsID() {
        return investitionsID;
    }

    public void setInvestitionsID(long investitionsID) {
        this.investitionsID = investitionsID;
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
