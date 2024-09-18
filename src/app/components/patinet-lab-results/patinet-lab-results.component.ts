import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as Highcharts from 'highcharts/highstock';

interface patinetLabData {
  Labanalyte: string
  Labdate : string
  Labinterpretation : string
  Lablocaltemplist : string
  Labordergenus : string
  Labordertype : string
  Labstatus : string
  Labvalue : string
  Patientid : number
  Tietorderyn : boolean
}

@Component({
  selector: 'app-patinet-lab-results',
  templateUrl: './patinet-lab-results.component.html',
  styleUrls: ['./patinet-lab-results.component.css']
})

export class PatinetLabResultsComponent implements OnInit {
  labResultList : patinetLabData [] | undefined;
  groupByValueBorderUnit: { [unit: string]: patinetLabData[] } = {};

  vitalsChartOPtions: any;
  highcharts : typeof Highcharts = Highcharts;
  
  constructor(private apiService : ApiService){

  }
  
  ngOnInit(): void {
    this.apiService.getLabResults().subscribe({
      next : (res : any) => {
        this.labResultList = res.List
        this.labResultList = this.labResultList?.filter((data) => data.Labvalue != null)

        this.groupByValueBordeUnit();

        console.log(this.labResultList);
        console.log(this.groupByValueBorderUnit);

        this.VitalsChart(this.groupByValueBorderUnit)
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  groupByValueBordeUnit(): void {
    if (this.labResultList) {
        this.labResultList.forEach((data) => {
            const unit = this.extractUnit(data.Labvalue);
            const compoundKey = `${data.Labanalyte}_${data.Labordertype}`; // Create a compound key

            if (unit && compoundKey) {
                if (!this.groupByValueBorderUnit[compoundKey]) {
                    this.groupByValueBorderUnit[compoundKey] = [];
                    this.groupByValueBorderUnit[compoundKey].push(data);
                } else {
                    // Check if the unit exists in the compoundKey object
                    const unitExists = this.groupByValueBorderUnit[compoundKey].some((existingData) =>
                        this.extractUnit(existingData.Labvalue) === unit
                    );

                    // If the unit doesn't exist, push the data
                    if (unitExists) {
                        this.groupByValueBorderUnit[compoundKey].push(data);
                    }
                }
            }
        });
    }
}


  extractUnit(value: string): string {
    // Check for values that have a percentage sign or ratio
    if (value.includes('%')) {
      return '%';
    } else if (value.includes('RATIO')) {
      return 'RATIO';
    }

    // Otherwise, attempt to extract the unit by splitting the string
    const parts = value.split(' ');
    const unit = parts[parts.length - 1];

    // Check if the extracted unit has a digit and ends with non-letter characters
    if (/\d/.test(unit) && !/[a-zA-Z]+$/.test(unit)) {
      return unit.replace(/[0-9.]/g, ''); // Remove digits and decimals
    }

    return unit;
  }

  calculateChartHeight(): number {
    const perChartHeight =200; 
    const numberOfUnits = Object.keys(this.groupByValueBorderUnit).length; 

    const totalHight = perChartHeight * numberOfUnits

    return totalHight;
}

  VitalsChart(measurementsByUnit: any) {
    const units = Object.keys(measurementsByUnit);
    const numberOfUnits = Object.keys(measurementsByUnit).length;
    const perGraphPercentage = 100 / numberOfUnits

    const yAxisConfigurations = units.map((unit: string, index: number) => ({
        labels: {
            align: 'right',
            x: -3
        },
        title: {
            text: unit
        },
        top: `${perGraphPercentage * index}%`, // Dynamically calculate top based on index and numberOfUnits
        height: `${perGraphPercentage - 0.2}%`,
        offset: 0,
        lineWidth: 2
    }));

    const series = units.map((unit: string, index: number) => (  {
        type: 'line',
        name: unit,
        data: measurementsByUnit[unit].map((data: patinetLabData , index : number) => ({
          x: index,
          y: parseFloat(data.Labvalue),
          Labanalyte: data.Labanalyte,
          Labordertype: data.Labordertype,
          Labstatus: data.Labstatus,
          unit: this.extractUnit(data.Labvalue) 
        })),
        yAxis: index,
    }));

    console.log(series);

    if (series && yAxisConfigurations) {
        this.vitalsChartOPtions = {
            rangeSelector: {
                selected: 4
            },
            title: {
                text: 'Patient Lab Results Data'
            },
            yAxis: yAxisConfigurations,
            tooltip: {
              formatter(this: Highcharts.TooltipFormatterContextObject) {
                const point: any = this.point;
                // Custom tooltip format including Labanalyte and Labordertype
                return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${this.y} ${point.unit}</b><br/> Labanalyte: ${point.Labanalyte}<br/> Labordertype: ${point.Labordertype} <br /> Labstatus: ${point.Labstatus}`;
               }
            },
            series: series
        };
    }
}

}
