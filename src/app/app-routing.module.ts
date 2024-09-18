import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatinetChartComponent } from './components/patinet-chart/patinet-chart.component';
import { PatinetIcdChartComponent } from './components/patinet-icd-chart/patinet-icd-chart.component';
import { PatinetLabResultsComponent } from './components/patinet-lab-results/patinet-lab-results.component';
import { BioInfoVariantComponent } from './components/bio-info-variant/bio-info-variant.component';

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
   path: 'bio-info'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
