import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../research.service';
import { Res } from '../res-template';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent {

  research: Res[];

  constructor(private researchService: ResearchService) {
    this.getResearch();
  }

  getResearch(): void {
    this.researchService.getResearch()
      .subscribe(research => {
        this.research = research;
      });
  }

}
