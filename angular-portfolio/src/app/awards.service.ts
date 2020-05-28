import { Injectable } from '@angular/core';
import { Awards } from './awardsTemplate';
import { AWARD } from './mock-awards';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  constructor() { }

  getAwards(): Observable<Awards[]> {
    return of(AWARD);
  }
}
