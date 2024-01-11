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
    private Dringlichkeit dringlichkeit;
    @Column
    private  Status status;
    @Column
    private String bezeichnung;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "investitionsID")
    private Investition investition;

}
