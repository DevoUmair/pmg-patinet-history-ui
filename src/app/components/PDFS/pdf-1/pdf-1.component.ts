import { Component, OnInit, Inject , SecurityContext  } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { PatientsService } from 'src/app/services/patients.service';
import { saveAs } from 'file-saver'; 
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  pdfUrl:SafeResourceUrl;
  pdfUrlString: string;
  IsLoading: boolean;  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private domSanitizer:DomSanitizer,private patientService: PatientsService , private http: HttpClient){

  }
  ngOnInit(): void {
  
    this.IsLoading = true;
    console.log(this.data.allpatientdata);
    //console.log("Data of data",this.data.allpatientdata1.ConsentFilePath);
    if(this.data.allpatientdata && this.data.allpatientdata.TestResultDoc){
      this.pdfUrl=this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.allpatientdata.TestResultDoc)
    }  
    if(this.data.allpatientdata && this.data.allpatientdata.ReqFormUrl){
      // this.data.allpatientdata.ReqFormUrl = "https://tisoroglobal.s3.amazonaws.com/4487/MoU_Sign_Document/MoU-Sign_20_2_2024_1708438808481.pdf";
      this.pdfUrl=this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.allpatientdata.ReqFormUrl)
      console.log(this.pdfUrl);
      console.log(this.data.allpatientdata.ReqFormUrl);
    }  
    if(this.data.allpatientdata1 && this.data.allpatientdata1.ConsentFilePath){
      this.pdfUrl=this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.allpatientdata1.ConsentFilePath)
    }  
    if(this.data.allpatientdata2 && this.data.allpatientdata2.resultFile){
      this.pdfUrl=this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.allpatientdata2.resultFile)
    }  

    this.pdfUrlString = this.getSafeUrlAsString(this.pdfUrl);
    this.downloadPDF2(this.pdfUrlString)

    setTimeout(() => {
      this.IsLoading = false; // Stop loading after the PDF URL is ready
    }, 2000); 
  }

  private getSafeUrlAsString(safeUrl: SafeResourceUrl): string {
    // Extract the URL from SafeResourceUrl
    return this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl) ?? '';
  }


  downloadPDF2(pdfUrl: string) {
    console.log(pdfUrl);
    let a = document.createElement('a')
    a.download = pdfUrl
    a.target = '_blank';
    a.href = pdfUrl
    a.click()
  }
  
}
