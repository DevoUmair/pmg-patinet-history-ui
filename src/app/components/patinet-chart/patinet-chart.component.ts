import { DatePipe } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as Highcharts from 'highcharts/highstock';

export interface PatinetVitals{
  EncBg : string
  ​​EncBgDate : string
  ​​​EncBmi : string
  ​​​EncBmiDate : string
  ​​​EncBp : string
  ​​​EncBpDate : string
  ​​​EncWt : string
  ​​​EncWtDate : string
  ​​​FamHistProb : string
  ​​​Patientid : string
  ​​​SurgHistDate : string
  ​​​SurgHistNotes : string
  SurgHistProc : string
}

@Component({
  selector: 'app-patinet-chart',
  templateUrl: './patinet-chart.component.html',
  styleUrls: ['./patinet-chart.component.css']
})
export class PatinetChartComponent implements OnInit{

  patientVitals : PatinetVitals [] | undefined;
  BMIDate : string [] |  undefined ;
  BMIData : string [] |  undefined ;
  formattedBMIDate : string[] | null = null;

  WeightData : number [] | undefined;
  WeightDate : string [] | undefined;
  formattedWeightdate : string [] | undefined;

  HighBloodPressureData : number [] | undefined;
  LowBloodPressureData : number [] | undefined;
  BloodPresureDate : string [] | undefined;
  formattedBloodPresureDate : string [] | undefined;
  
  highcharts : typeof Highcharts = Highcharts;
  BmichartOptions : any;
  WeightchartOptions : any;
  BpCahrtOptions : any;

  constructor(private apiService : ApiService , private datePipe : DatePipe){
   
  }

  ngOnInit(): void {

    this.apiService.getPatinet().subscribe({
      next : (res : any) => {
        console.log(res);
        this.patientVitals = res.List;

        this.BMIData = this.patientVitals?.map((data) => data.EncBmi).filter((encBmi) => encBmi !== null);
        this.BMIDate = this.patientVitals?.map((data) => data.EncBmiDate).filter((encBmiDate) => encBmiDate !== null )
        this.formattedBMIDate = (this.BMIDate?.map(dateString => dateString ? this.datePipe.transform(dateString, 'yyyy-MM-dd') : '') || []) as string[];
        
        this.WeightData = this.patientVitals?.map((data) => {
          const encWt = data.EncWt;
          if (encWt !== null && encWt.trim() !== "") {
            return parseFloat(encWt.replace("lbs", "").trim());
          }
          return 0;
        }).filter((encWt) => encWt !== 0);
        this.WeightDate = this.patientVitals?.map((data) => data.EncWtDate).filter((encWtDate) => encWtDate !== null )
        this.formattedWeightdate = (this.WeightDate?.map(dateString => dateString ? this.datePipe.transform(dateString, 'yyyy-MM-dd') : '') || []) as string[];

        this.HighBloodPressureData = (this.patientVitals as (PatinetVitals | null)[] | undefined)?.map((data) => {
          if (data !== null && typeof data.EncBp === 'string') {
            const bloodPressureArray = data.EncBp.split('/');
            const systolicPressure = parseInt(bloodPressureArray[0], 10);
        
            if (!isNaN(systolicPressure)) {
              return systolicPressure;
            }
          }
        
          return 0;
        }).filter((encBp) => encBp !== 0);

        this.LowBloodPressureData = (this.patientVitals as (PatinetVitals | null)[] | undefined)?.map((data) => {
          if (data !== null && typeof data.EncBp === 'string') {
            const bloodPressureArray = data.EncBp.split('/');
            const systolicPressure = parseInt(bloodPressureArray[1], 10);
        
            if (!isNaN(systolicPressure)) {
              return systolicPressure;
            }
          }
        
          return 0;
        }).filter((encBp) => encBp !== 0);

        this.BloodPresureDate = this.patientVitals?.map((data) => data.EncBpDate).filter((encBpDate) => encBpDate !== null )
        this.formattedBloodPresureDate = (this.BloodPresureDate?.map(dateString => dateString ? this.datePipe.transform(dateString, 'yyyy-MM-dd') : '') || []) as string[];


        console.log(this.BloodPresureDate);
        console.log(this.formattedBloodPresureDate);
        console.log(this.HighBloodPressureData);
        console.log(this.LowBloodPressureData);
        this.BmiLineChart(this.BMIData , this.formattedBMIDate)
        this.WeihghtLineChart(this.WeightData , this.formattedWeightdate)
        this.BpLineChart(this.HighBloodPressureData , this.LowBloodPressureData , this.formattedBloodPresureDate)
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  BpLineChart(data2 : any ,  data1 : any  , categroies : any){
    this.BpCahrtOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Patinet 15197 Blood Presuer Report'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categroies,
        title : {
          text : 'Date'
        },
      },
      yAxis : {
        title : {
          text : 'Blood Presuer'
        },
      },
      
      series: [
        {
          name: 'High Presure',
          data: data1 // Initialize with an empty array
        },
        {
          name: 'Low Presure',
          data: data2 // Initialize with an empty array
        }
      ] 
    }
  }

  BmiLineChart(data : any  , categroies : any){
    this.BmichartOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Patinet 15197 BMI Report'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categroies,
        title : {
          text : 'Date'
        },
      },
      yAxis : {
        title : {
          text : 'BMI'
        },
      },
      plotOptions: {
        series: {
            color: 'purple'
        }
      },
      series: [
        {
          name: 'BMI',
          data: data // Initialize with an empty array
        }
      ] 
    }
  }

  WeihghtLineChart(data : any  , categroies : any){
    this. WeightchartOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Patinet 15197 Weight Report'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categroies,
        title : {
          text : 'Date'
        },
      },
      yAxis : {
        title : {
          text : 'Weight'
        },
      },
      plotOptions: {
        series: {
            color: 'green'
        }
      },
      series: [
        {
          name: 'Weight',
          data: data // Initialize with an empty array
        }
      ] 
    }
  }
  
}
