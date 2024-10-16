import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private patientVitalsUrl = "http://localhost:51864/api/Patients/PatinetVitals/15197" 
  private icdCodeUrl = "http://localhost:51864/api/Patients/ICDs/15197/0/0?isAsc=true"
  private labUrl = "http://localhost:51864/api/Patients/LabRsults/15221/0/0?isAsc=true"
  private varinatUrl = "http://localhost:51865/api/Bioinformatics/"

  constructor(private http : HttpClient) {

  }

  getPatinet(){
    return this.http.get(this.patientVitalsUrl)
  }

  getIcdCode(){
    return this.http.get(this.icdCodeUrl)
  }

  getLabResults(){
    return this.http.get(this.labUrl)
  }

  getVarinatDataBioInformatica(accesionId: string, offset: number, length: number , acmgClassification: string) {
    console.log(accesionId);
    return this.http.get(`${this.varinatUrl}variants/${accesionId}/${offset}/${length}/${acmgClassification}`);
  }
  
  getUniqueAcmgClassification() {
    return this.http.get(`${this.varinatUrl}unique-acmg-classifications/`);
  }

  getAnalysisSpecificPatientid(patinetId : number) {
    return this.http.get(`${this.varinatUrl}analysis-specific-patient/${patinetId}`);
  }

  getPatientVariantsPdf1(analysisId : string){
    return this.http.get(`${this.varinatUrl}patient-variants-pdf1-data/${analysisId}`)
  }
}
