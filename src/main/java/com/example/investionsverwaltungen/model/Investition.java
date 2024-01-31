package com.example.investionsverwaltungen.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.GenerationType.AUTO;

/**
 * Die {@code Investition} Klasse repräsentiert eine Investition innerhalb des Systems.
 * Sie wird verwendet, um Informationen über einzelne Investitionen zu speichern und zu verwalten.
 * Diese Klasse ist mit der Datenbank über JPA (Jakarta Persistence API) annotiert, wodurch eine Tabelle mit dem Namen "Investition" in der Datenbank erstellt wird.
 * Die Klasse verwendet Lombok-Bibliotheksannotationen {@code @Setter}, {@code @Getter} und {@code @NoArgsConstructor},
 * um Boilerplate-Code wie Setter, Getter und einen parameterlosen Konstruktor automatisch zu generieren.
 */

@Setter
@Getter
@Entity
@Table(name = "Investition")
@NoArgsConstructor
public class Investition {
    @Id
    @GeneratedValue(strategy = AUTO)
    public Long id;
    @Column
    public Long massnahmeid;
    @Column
    public Integer jahr;
    @Column
    public Double kosten;
    @Column
    public String anmerkung;
}