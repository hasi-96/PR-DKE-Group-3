package com.example.investionsverwaltungen.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.GenerationType.AUTO;

@Setter
@Getter
@Entity
@Table(name = "Massnahme")
@NoArgsConstructor
public class Massnahme {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long massnahmenID;

    @Column
    private String anmerkung;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "investitionsID", referencedColumnName = "investitionsID")
    Investition investition;

    // ToDo: Diese Daten müssen von der REST API Objektverwaltung eingelesen werden
    @Column
    Long objektID;
    @Column
    String bauteil;
    // ToDo: Diese Daten müssen von der REST API Inspektionsverwaltung eingelesen werden
    @Column
    Long inspektionsID;
    @Column
    String inspektionselement; // kommt bauteilbewertung von Inspektion
    @Column
    Status status;
    @Column
    Dringlichkeit dringlichkeit;

}
