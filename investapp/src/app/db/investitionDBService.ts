import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {Investition} from "../investition";

@Injectable({
  providedIn: 'root'
})
export class InvestitionenDbService extends Dexie {
  public investitionen: Dexie.Table<Investition, number>;


  constructor() {
    super('InvestitionenDB');
    this.version(1).stores({
      investitionen: '++investitionsID, massnahmeID, jahr, kosten, anmerkung'
    });
    this.investitionen = this.table('investitionen');
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

}
