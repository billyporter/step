import { Injectable } from '@angular/core';
import { Res } from './resTemplate';
import { RESES } from './mock-research';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor() { }

  getResearch(): Observable<Res[]> {
    return of(RESES);
  }
}
