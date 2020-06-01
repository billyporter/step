import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../research.service';
import { Res } from '../res-template';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {

  research: Res[];

  constructor(private researchService: ResearchService) {
    this.getResearch();
  }

  ngOnInit(): void {
  }

  getResearch(): void {
    this.researchService.getResearch()
      .subscribe(research => {
        this.research = research;
      });
  }

}
