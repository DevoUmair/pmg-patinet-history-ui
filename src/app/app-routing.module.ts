import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatinetChartComponent } from './components/patinet-chart/patinet-chart.component';
import { PatinetIcdChartComponent } from './components/patinet-icd-chart/patinet-icd-chart.component';
import { PatinetLabResultsComponent } from './components/patinet-lab-results/patinet-lab-results.component';
import { BioInfoVariantComponent } from './components/bio-info-variant/bio-info-variant.component';
import { Pdf1Component } from './components/PDFS/pdf-1/pdf-1.component';
import { Pdf2Component } from './components/PDFS/pdf-2/pdf-2.component';
import { Pdf3Component } from './components/PDFS/pdf-3/pdf-3.component';
import { Pdf4Component } from './components/PDFS/pdf-4/pdf-4.component';
import { AnlaysisPatientComponent } from './components/bio-info-variant/anlaysis-patient/anlaysis-patient.component';

const routes: Routes = [
  {
   component: PatinetChartComponent,
   path: 'patinet-vitals'
  },
  {
   component: PatinetIcdChartComponent,
   path: 'patinet-icd'
  },
  {
   component: PatinetLabResultsComponent,
   path: 'patinet-lab'
  },
  {
   component: BioInfoVariantComponent,
   path: 'bio-info/:id'
  },
  {
   component: AnlaysisPatientComponent,
   path: 'anlysis-patient'
  },
  {
   component: Pdf1Component,
   path: 'pdf-1/:id'
  },
  {
   component: Pdf2Component,
   path: 'pdf-2'
  },
  {
   component: Pdf3Component,
   path: 'pdf-3'
  },
  {
   component: Pdf4Component,
   path: 'pdf-4'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
