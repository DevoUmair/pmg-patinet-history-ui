import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatinetChartComponent } from './components/patinet-chart/patinet-chart.component';



const routes: Routes = [
  {
    path : '',
    component : PatinetChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
