import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './component/app/app.component';
import { InvestitionenComponent } from './component/investition/investitionen.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import {InvestitionenDbService} from "./service/db/investitionDBService";
import {InvestitionService} from "./service/investition.service";
import { MassnahmeComponent } from './component/massnahme/massnahme.component';
import {MassnahmeService} from "./service/massnahme.service";


@NgModule({
  declarations: [
    AppComponent,
    InvestitionenComponent,
    MassnahmeComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
      HttpClientModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })
    ],
  providers: [InvestitionenDbService, InvestitionService,MassnahmeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

