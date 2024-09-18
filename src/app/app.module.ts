import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatinetChartComponent } from './components/patinet-chart/patinet-chart.component';

import {HttpClientModule} from '@angular/common/http'
import {HighchartsChartModule} from 'highcharts-angular';
import {DatePipe} from '@angular/common';
import { PatinetIcdChartComponent } from './components/patinet-icd-chart/patinet-icd-chart.component';
import { PatinetLabResultsComponent } from './components/patinet-lab-results/patinet-lab-results.component';
import { BioInfoVariantComponent } from './components/bio-info-variant/bio-info-variant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BioInfoColumnFillterComponent } from './components/bio-info-variant/bio-info-column-fillter/bio-info-column-fillter.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    PatinetChartComponent,
    PatinetIcdChartComponent,
    PatinetLabResultsComponent,
    BioInfoVariantComponent,
    BioInfoColumnFillterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
