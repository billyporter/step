import { Injectable } from '@angular/core';
import { Awards } from './awards-template';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  private listAwardsResouce = '/load-awards';

  constructor(private readonly http: HttpClient) {}

  /** GET Awards from server */
  getAwards(): Observable<Awards[]> {
    return this.http.get<Awards[]>(this.listAwardsResouce);
  }
  
}
