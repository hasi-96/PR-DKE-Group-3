
package com.example.investionsverwaltungen.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.GenerationType.AUTO;

/**
 * Die {@code Massnahme} Klasse repräsentiert eine Maßnahme innerhalb des Systems.
 * Sie wird verwendet, um Informationen über einzelne Maßnahmen zu speichern und zu verwalten, die im Rahmen der Investitionsverwaltung durchgeführt werden.
 * Diese Klasse ist mit der Datenbank über JPA (Jakarta Persistence API) annotiert, was die Erstellung einer entsprechenden "Massnahmen" Tabelle in der Datenbank ermöglicht.
 * Die Klasse nutzt Lombok-Bibliotheksannotationen {@code @Setter}, {@code @Getter} und {@code @NoArgsConstructor},
 * um Boilerplate-Code wie Setter, Getter und einen parameterlosen Konstruktor automatisch zu generieren.
 */
@Setter
@Getter
@Entity
@Table(name = "Massnahmen")
@NoArgsConstructor
public class Massnahme {
    @Id
    @GeneratedValue(strategy = AUTO)
    public Long id;
    @Column
    public String dringlichkeit;
    @Column
    public String anmerkung;
    @Column
    public String status;
    @Column
    private String bauteil;
    @Column
    public Long objektid;
    @Column
    public Long inspektionid;

}