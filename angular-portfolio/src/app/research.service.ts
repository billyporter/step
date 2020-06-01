import { Injectable } from '@angular/core';
import { Res } from './res-template';
import { RESES } from './mock-research';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ResearchService {

  getResearch(): Observable<Res[]> {
    return of(RESES);
  }
}
