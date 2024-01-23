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
    @JoinColumn(name = "investitionsID")
    Investition investition;


    @GeneratedValue(strategy = AUTO)
    @Column
    Long inspektionsID;

    @Column
    Status status;
    @Column
    Dringlichkeit dringlichkeit;



}