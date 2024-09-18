import { DatePipe } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as Highcharts from 'highcharts/highstock';


interface patientIcdCode{
  ClnEncDate : string
  Icd10encounterdiagcode : string
  Icd10encounterdiagdescr : string
  Patientid : number
}

interface chartData{
  y: number
  x: number
  name : string
}

@Component({
  selector: 'app-patinet-icd-chart',
  templateUrl: './patinet-icd-chart.component.html',
  styleUrls: ['./patinet-icd-chart.component.css']
})
export class PatinetIcdChartComponent implements OnInit {
  icdCodesData : patientIcdCode [] | undefined;

  icdCodeDates : string [] | undefined;
  icdCodes : string [] | undefined;
  formattedIcdDates : number [] | undefined;

  highcharts : typeof Highcharts = Highcharts;
  icdChartOptions : any;
  labeledData: chartData [] = [];

  constructor(private apiService : ApiService , private datePipe : DatePipe){

  }

  ngOnInit(): void {
    this.apiService.getIcdCode().subscribe({
      next : (res : any) => {
        this.icdCodesData = res.List
        console.log(this.icdCodesData);
        
        this.icdCodes = this.icdCodesData?.map((data) => data.Icd10encounterdiagcode).filter((code) => code !== null)
        const uniqueIcdCode = new Set(this.icdCodes)
        this.icdCodes = Array.from(uniqueIcdCode)

        this.icdCodeDates = this.icdCodesData?.map((data) => data.ClnEncDate).filter((ClnEncDate) => ClnEncDate !== null )
        this.formattedIcdDates = (this.icdCodeDates?.map(dateString => {
          const dateObject = new Date(dateString + 'Z'); // Append 'Z' for UTC timezone
          return dateObject ? dateObject.getTime() : 0;
        }) || []) as number[];

        

        const icdToNumeric: { [key: string]: number } = {};

        this.icdCodesData?.forEach((codeData , index) => {
          const icdCode = codeData.Icd10encounterdiagcode;
          this.labeledData.push({ name: icdCode, y: this.icdCodes?.indexOf(icdCode)! , x: this.formattedIcdDates![index] });
        });
        

        console.log(this.formattedIcdDates);
        console.log(this.icdCodes);
        console.log(this.labeledData);
        
        this.BmiLineChart(this.labeledData , this.icdCodes!)

      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  
  
  BmiLineChart(data : chartData [] , categories : string []){
    this.icdChartOptions = {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: 'Patient 151917 ICD Codes',
        align: 'center'
      },
      xAxis: {
        type: 'datetime',
        gridLineWidth: 1,
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
        title: {
          text: 'Date' // Add your y-axis title here
        }
      },
      yAxis: {
        categories: categories,
        title: {
          text: 'ICD Codes' // Add your y-axis title here
        }
      },
      accessibility: {
        enabled: false
      },
      tooltip: {
        formatter(this: Highcharts.TooltipFormatterContextObject) {
          
          let formattedDate = '';

          if (typeof this.x === 'number') {
            formattedDate = Highcharts.dateFormat('%Y-%m-%d', this.x); // Format the timestamp using Highcharts.dateFormat
          }

          const foundObject = data.find((item: chartData) => item.y === this.y);
          const icdName = foundObject ? foundObject.name : '';
          
          return `<b>Date:</b> ${formattedDate} <br/><b>ICD code:</b> ${icdName}`;
        }
      },
      series: [{
        type: 'scatter',
        data: data
      }]
    }
  }

  
}
