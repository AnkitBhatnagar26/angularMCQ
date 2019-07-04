import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  public getJSON(url: string): Observable<any> {
    return this.http.get(SERVER_URL + url);
  }

  public sendMail(url: string, user) {
    return this.http.post(SERVER_URL + url, user);
  }
}
