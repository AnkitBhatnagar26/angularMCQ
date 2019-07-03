import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  detailsObj = {}
  constructor(private http: HttpClient) { }

  setDetails(detailsObj: Object){
    this.detailsObj = detailsObj;
  }

  getDetails(){
    return this.detailsObj;
  }
}
