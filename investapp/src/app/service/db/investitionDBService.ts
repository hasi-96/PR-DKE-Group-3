import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {Investition} from "../../model/investition";
import {Massnahme} from "../../model/massnahme";

@Injectable({
  providedIn: 'root'
})
export class InvestitionenDbService extends Dexie {
  public investitionen: Dexie.Table<Investition, number>;
  public massnahmen: Dexie.Table<Massnahme, number>;


  constructor() {
    super('InvestitionenDB');
    this.version(1).stores({
      investitionen: '++investitionsID, massnahmeID, jahr, kosten, anmerkung',
      massnahmen: '++massnahmenID, dringlichkeit, status, bezeichnung, investitionsID'
    });
    this.investitionen = this.table('investitionen');
    this.massnahmen = this.table('massnahmen');
  }

  async addInvestition(investition: Investition): Promise<number> {
      return this.investitionen.add(investition);
  }

  async getInvestitionen(): Promise<Investition[]> {
    return this.investitionen.toArray();
  }

  async deleteInvestition(investitionsID: number): Promise<void> {
    return this.investitionen.delete(investitionsID);
  }

  async clearAllData() {
        const tables = this.tables;
        return Promise.all(tables.map(table => table.clear()));
    }
  async updateInvestition(investitionsID: number, investition: Investition): Promise<number> {
    return this.investitionen.update(investitionsID, investition);
  }
  async saveInvestitionen(investitionenArray: Investition[]): Promise<void> {
    await this.transaction('rw', this.investitionen, async () => {
      for (const investition of investitionenArray) {
        await this.investitionen.put(investition);
      }
    });
  }


  }
