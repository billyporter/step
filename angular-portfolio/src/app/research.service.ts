import { Injectable } from '@angular/core';
import { Res } from './res-template';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ResearchService {

  private researchUrl = '/load-research';

  constructor(private http: HttpClient) {}

  /** GET research from server */
  getResearch(): Observable<Res[]> {
    return this.http.get<Res[]>(this.researchUrl);
  }
  
}
