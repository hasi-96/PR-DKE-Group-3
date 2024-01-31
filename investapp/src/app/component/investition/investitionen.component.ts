import {Component, OnInit} from '@angular/core';
import {Investition} from "../../model/investition";

import {InvestitionService} from "../../service/investition.service";

/**
 * Die InvestitionenComponente ist verantwortlich für die Darstellung und Verwaltung
 * der Benutzeroberfläche zur Interaktion mit Investitionsdaten. Sie ermöglicht
 * das Anzeigen, Erstellen, Bearbeiten und Löschen von Investitionen.
 */
@Component({
  selector: 'app-investitionen',
  templateUrl: './investitionen.component.html',
  styleUrls: ['./investitionen.component.css']
})
export class InvestitionenComponent implements OnInit {
  editInvestition: Investition | undefined;
  public massnahmeIDs: number[] = [];

  constructor(public investitionService: InvestitionService) {
  }

  ngOnInit() {
    this.investitionService.getInvestition();
    this.getMassnahmeIDs();
  }

  getMassnahmeIDs(): void {
    this.investitionService.getMassnahmeID().subscribe(massnahme => {
      this.massnahmeIDs = massnahme.map(massnahme => massnahme.id);
    });
  }

  onButtonClickRefresh(): void {
    this.investitionService.getInvestition();
    this.investitionService.getMassnahmeID();
  }

  onButtonClickNew(): void {
    this.editInvestition = {id: -1} as Investition;
    if (this.editInvestition !== undefined) {
      this.editInvestition.id = -1;
    }
  }

  onButtonClickEdit(): void {
    if (this.editInvestition !== undefined) {
      if (this.editInvestition.id == -1)
        this.investitionService.addInvestition(this.editInvestition);
      else
        this.investitionService.editInvestition(this.editInvestition);

      this.editInvestition = undefined;
    }
  }

  onButtonClickDel(): void {
    if (this.editInvestition !== undefined) {
      this.investitionService.deleteInvestition(this.editInvestition.id);
      this.editInvestition = undefined;
    }
  }

  onButtonClickSelect(id: number): void {
    this.editInvestition = undefined;
    this.investitionService.getInvestitionById(id).subscribe((r: Investition) => {
      this.editInvestition = r;
      this.getMassnahmeIDs();
    });
  }

  onButtonClickCancel(): void {
    if (this.editInvestition !== undefined)
      this.editInvestition = undefined;
  }
}
