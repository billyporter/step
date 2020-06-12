import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorDataService {

  private dataSource = new BehaviorSubject<string[]>([]);
  currentColors = this.dataSource.asObservable();

  constructor() { }

  changeColors(hookColorArray: string[]) {
    this.dataSource.next(hookColorArray);
  }
}
