import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InspektionenComponent } from './inspektionen/inspektionen.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import {InspektionenDbService} from "./db/inspektionDBService";
import {InspektionService} from "./service/inspektion.service";


@NgModule({
  declarations: [
    AppComponent,
    InspektionenComponent
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
  providers: [InspektionenDbService, InspektionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

