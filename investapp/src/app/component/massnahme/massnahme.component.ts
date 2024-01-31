import {Component, OnInit} from '@angular/core';


import {MassnahmeService} from "../../service/massnahme.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Massnahme} from "../../model/massnahme";


@Component({
  selector: 'app-massnahme',
  templateUrl: './massnahme.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./massnahme.component.css']
})

/**
 * Die MassnahmeComponente ist verantwortlich für die Darstellung und Interaktion
 * mit Maßnahmendaten im Kontext von Bauobjekten. Sie ermöglicht Benutzern das Anzeigen,
 * Erstellen, Bearbeiten und Löschen von Maßnahmen sowie die Auswahl von spezifischen
 * Bauobjekten und deren Komponenten.*/

export class MassnahmeComponent implements OnInit {

  bauobjektIds: number[] = [];
  editMassnahme: Massnahme | undefined;
  public bauobjektkomponenten: string[] = [];


  constructor(public massnahmeService: MassnahmeService) {
  }

  ngOnInit(): void {
    this.getBauobjektIds();
    this.getBauobjektKomponente();
    this.massnahmeService.getMassnahmen();

  }

  onBauobjektIdChange() {
    // Lade die Bauobjektkomponenten basierend auf der ausgewählten Bauobjekt-ID
    this.getBauobjektKomponente();
  }

  getBauobjektIds(): void {
    this.massnahmeService.getBauobjekteID().subscribe(bauobjekte => {
      this.bauobjektIds = bauobjekte.map(bauobjekt => bauobjekt.id);
    });
  }

  getBauobjektKomponente() {
    if (this.editMassnahme !== undefined && this.editMassnahme.objektid !== undefined) {
      this.massnahmeService.getBauobjektkomponentenByBauobjektId(this.editMassnahme.objektid)
        .subscribe(komponenten => {
          this.bauobjektkomponenten = komponenten;
        });
    }
  }

  onButtonClickRefresh(): void {
    this.massnahmeService.getMassnahmen();
    this.massnahmeService.getBauobjekteID();
  }

  onButtonClickNew(): void {

    this.editMassnahme = {id: -1} as Massnahme;
    if (this.editMassnahme !== undefined) {
      this.editMassnahme.id = -1;
    }
  }

  onButtonClickEdit(): void {
    if (this.editMassnahme !== undefined) {
      if (this.editMassnahme.id == -1)
        this.massnahmeService.addMassnahme(this.editMassnahme);
      else
        this.massnahmeService.editMassnahme(this.editMassnahme);

      this.editMassnahme = undefined;
    }
  }

  onButtonClickDel(): void {
    if (this.editMassnahme !== undefined) {
      this.massnahmeService.delMassnahme(this.editMassnahme.id);
      this.editMassnahme = undefined;
    }
  }

  onButtonClickSelect(id: number): void {
    this.editMassnahme = undefined;

    this.massnahmeService.getMassnahmeById(id).subscribe((r: Massnahme) => {
      this.editMassnahme = r;
      this.getBauobjektKomponente();
    });
  }

  onButtonClickCancel(): void {
    if (this.editMassnahme !== undefined)
      this.editMassnahme = undefined;
  }
}
