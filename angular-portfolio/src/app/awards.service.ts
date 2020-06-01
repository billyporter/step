import { Injectable } from '@angular/core';
import { Awards } from './awards-template';
import { AWARD } from './mock-awards';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {

  getAwards(): Observable<Awards[]> {
    return of(AWARD);
  }
}
