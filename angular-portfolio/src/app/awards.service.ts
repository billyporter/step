import { Injectable } from '@angular/core';
import { Awards } from './awards-template';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const LIST_AWARDS_RESOURCE = '/load-awards';
@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  constructor(private readonly http: HttpClient) {}

  /** GET Awards from server */
  getAwards(): Observable<Awards[]> {
    return this.http.get<Awards[]>(LIST_AWARDS_RESOURCE);
  }
}
