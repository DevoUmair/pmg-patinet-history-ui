import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

interface PatientVariantData {
  ACMGClassification: string;
  ACMGRules: string;
  AllelicBalance: string;
  AnalysisId: number;
  Coverage: string;
  ExonLocation: string;
  GeneSymbol: string;
  HGVSNotation: string;
  Variant: string;
  VariantId: number;
  Zygosity: string;
}

@Component({
  selector: 'app-pdf-1',
  templateUrl: './pdf-1.component.html',
  styleUrls: ['./pdf-1.component.css']
})
export class Pdf1Component implements OnInit {
  accessionId: string | null = null;
  variantData : PatientVariantData  [] = []
  constructor(private apiService: ApiService , private route: ActivatedRoute){

  }
  ngOnInit(): void {
  
    this.route.paramMap.subscribe(params => {
      this.accessionId = params.get('id'); // 'id' is the name of the route parameter
      // console.log(this.analysisId);
      this.loadData()
    });
  }



  loadData(){
    if (this.accessionId) { // Ensure analysisId is not null or undefined
      this.apiService.getPatientVariantsPdf1(this.accessionId).subscribe({
        next: (res : any) => {
          this.variantData = res
        },
        error: (err) => {
          console.error('Error fetching data', err);
        },
        complete : () => {
          console.log(this.variantData);
        }
      });
    } else {
      console.error('Analysis ID is null or undefined.');
    }
  }
}
