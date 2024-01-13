package com.example.investionsverwaltungen.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.GenerationType.AUTO;

@Setter
@Getter
@Entity
@Table(name = "Investition")
@NoArgsConstructor
public class Investition {
    @Id
    @GeneratedValue(strategy = AUTO)
    Long investitionsID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "massnahmenID", referencedColumnName = "massnahmenID")
    private Massnahme massnahme;

    @Column
    Integer jahr;
    @Column
    Double kosten;
    @Column
    String anmerkung;


}
