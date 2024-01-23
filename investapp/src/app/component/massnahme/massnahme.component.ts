import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {InvestitionenDbService} from "../../service/db/investitionDBService";
import {InvestitionService} from "../../service/investition.service";
import {Investition} from "../../model/investition";
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-investitionen',
  templateUrl: './investitionen.component.html',
  styleUrls: ['./investitionen.component.css']
})
export class InvestitionenComponent implements OnInit {

  investition: Investition = {
    massnahmeID: 0,
    jahr: new Date().getFullYear(),
    kosten: 0,
    anmerkung: ''
  };
  investitionen: Investition[] = [];
  private isSynchronizing = false;
  constructor(
    private dbService: InvestitionenDbService,
    private apiService: InvestitionService
  ) {}

  ngOnInit() {
    window.addEventListener('online', () => this.synchronizeData());
    this.loadInvestitionen();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dbService.addInvestition(this.investition).then(investitionsID => {
        console.log('Investition in IndexedDB gespeichert mit ID:', investitionsID);
        if (navigator.onLine && !this.isSynchronizing){
          this.synchronizeData();
        }
        this.loadInvestitionen();
        form.resetForm();
        this.resetInvestition();
      });
    }
  }
  loadInvestitionen() {
    if (navigator.onLine) {
      this.apiService.getInvestitionen().subscribe(data => {
        this.investitionen = data;
        this.dbService.saveInvestitionen(data); // Daten in IndexedDB speichern
      }, error => {
        console.error('Fehler beim Laden der Investitionen aus der API', error);
      });
    } else {
      this.dbService.getInvestitionen().then(data => {
        this.investitionen = data;
      }).catch(error => {
        console.error('Fehler beim Laden der Investitionen aus der IndexedDB', error);
      });
    }
  }

  private resetInvestition() {
    this.investition = {
      massnahmeID: 0,
      jahr: new Date().getFullYear(),
      kosten: 0,
      anmerkung: ''
    };
  }

  private async synchronizeData(): Promise<void> {
    if (this.isSynchronizing || !navigator.onLine) {
      return;
    }
    this.isSynchronizing = true;

    const investitionen = await this.dbService.getInvestitionen();
    for (const investition of investitionen) {
      await firstValueFrom(this.apiService.createInvestition(investition));
      if (investition.investitionsID !== undefined) {
        await this.dbService.deleteInvestition(investition.investitionsID);
        console.log('Investition synchronisiert und aus IndexedDB gelöscht:', investition.investitionsID);
      }
    }

    await this.dbService.clearAllData();
    console.log('Alle Daten in der IndexedDB wurden gelöscht.');

    this.isSynchronizing = false;
    this.loadInvestitionen();
  }


}
