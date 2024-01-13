import {Component, OnInit} from '@angular/core';
import {Massnahme} from "../../model/massnahme";
import {MassnahmeService} from "../../service/massnahme.service";

@Component({
  selector: 'app-massnahme',
  templateUrl: './massnahme.component.html',
  styleUrls: ['./massnahme.component.css']
})
export class MassnahmeComponent implements OnInit{

  massnahme: Massnahme ={
    dringlichkeit: '',
    status: '',
    anmerkung: '',
    investitionsID: 0,
    objektID: 0,
    inspektionsID: 0,
    bauteil:'',
    inspektionselement: ''
  }
  constructor(
    private massnahmeService: MassnahmeService
  ) {
  }


  massnahmen: Massnahme[] = [];

  ngOnInit() {

  }


}
