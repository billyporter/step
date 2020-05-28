import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../research.service';
import { Res } from '../resTemplate';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {

  research: Res[];

  constructor(private researchService: ResearchService) { }

  ngOnInit(): void {
    this.getResearch();
  }

  getResearch(): void {
    this.researchService.getResearch()
      .subscribe(research => this.research = research);
  }

}
