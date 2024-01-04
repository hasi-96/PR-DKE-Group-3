import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	FormsModule,
 ServiceWorkerModule.register('ngsw-worker.js', {
   enabled: !isDevMode(),
   // Register the ServiceWorker as soon as the application is stable
   // or after 30 seconds (whichever comes first).
   registrationStrategy: 'registerWhenStable:30000'
 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
