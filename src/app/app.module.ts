import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatinetChartComponent } from './components/patinet-chart/patinet-chart.component';

import {HttpClientModule} from '@angular/common/http'
import {HighchartsChartModule} from 'highcharts-angular';
import {DatePipe} from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    PatinetChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
