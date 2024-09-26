import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

export interface VariantAnalysis {
  AnalysisId: number;
  AnalysisSubjectId: string;
  SampleId: number;
  SubjectId: string;
  Url: string;
  CreatedAt: string;
  UserFullName: string;
  ReferenceGenome: string;
  PatientId: number;
}

@Component({
  selector: 'app-anlaysis-patient',
  templateUrl: './anlaysis-patient.component.html',
  styleUrls: ['./anlaysis-patient.component.css']
})

export class AnlaysisPatientComponent implements OnInit {
  patientId: string | null = null;
  noDataFound : boolean = true
  patientIdNumber: number | null = null;
  loader : boolean = false
  displayedColumns: string[] = [
    'AnalysisId', 
    'AnalysisSubjectId', 
    'SampleId', 
    'SubjectId', 
    'Url', 
    'CreatedAt', 
    'UserFullName', 
    'ReferenceGenome',
    'Variants' 
  ];
  dataSource: MatTableDataSource<VariantAnalysis > = new MatTableDataSource<VariantAnalysis>();

  @ViewChild(MatPaginator, { static: false }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort?: MatSort;
  constructor(private apiService: ApiService , private router: Router){}

  ngOnInit(): void {
    
  }

  serahcAnalyisis(){
    this.loader = true;

    this.dataSource.data = [];
    this.patientIdNumber = Number(this.patientId);

    this.apiService.getAnalysisSpecificPatientid(this.patientIdNumber).subscribe({
      next : (res : any) => {
        console.log(res);
        this.loader = false
        this.dataSource.data = res;
        if(res.length !== 0){
          this.noDataFound = false
        }else{
          this.noDataFound = true
        }
      },
      error : (err) => {
        console.log(err);
      },
      complete : () => {
        this.loader = false
      }
    })
  }

  openLinkInNewTab(analysisId: number): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/bio-info', analysisId])
    );
    window.open(url, '_blank');
  }
}
