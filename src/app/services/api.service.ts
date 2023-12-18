import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "http://localhost:5000/api/Patients/BMIs/15197/0/20?isAsc=true" 

  constructor(private http : HttpClient) {

  }

  getPatinet(){
    return this.http.get(this.baseUrl)
  }
}
