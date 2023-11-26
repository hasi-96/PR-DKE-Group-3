import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {Inspektion} from "../inspektion";

@Injectable({
  providedIn: 'root'
})
export class InspektionenDbService extends Dexie {
  public inspektionen: Dexie.Table<Inspektion, number>;


  constructor() {
    super('InspektionenDB');
    this.version(1).stores({
      inspektionen: '++inspektionsID, massnahmeID, jahr, kosten, anmerkung'
    });
    this.inspektionen = this.table('inspektionen');
  }

  async addInspektion(inspektion: Inspektion): Promise<number> {
      return this.inspektionen.add(inspektion);
  }

  async getInspektionen(): Promise<Inspektion[]> {
    return this.inspektionen.toArray();
  }

  async deleteInspektion(inspektionsID: number): Promise<void> {
    return this.inspektionen.delete(inspektionsID);
  }
    async clearAllData() {
        const tables = this.tables;
        return Promise.all(tables.map(table => table.clear()));
    }

}
