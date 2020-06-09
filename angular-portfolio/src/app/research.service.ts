import { Injectable } from '@angular/core';
import { Res } from './res-template';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const RESEARCH_URL = '/load-research';
@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private readonly http: HttpClient) {}

  /** GET research from server */
  getResearch(): Observable<Res[]> {
    return this.http.get<Res[]>(RESEARCH_URL);
  }
}
