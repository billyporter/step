import { Component, OnInit, Input } from '@angular/core';
import { Awards } from '../awards-template';
import { AwardsService } from '../awards.service';

@Component({
  selector: 'app-award-detail',
  templateUrl: './award-detail.component.html',
  styleUrls: ['./award-detail.component.scss']
})
export class AwardDetailComponent implements OnInit {

  awards: Awards[];
  @Input() awardYear: number;
  hoverIndex: number;
  current: Awards;

  constructor(private awardService: AwardsService) { }

  ngOnInit(): void {
    this.getAwards();
  }

  getAwards(): void {
    this.awardService.getAwards()
      .subscribe(awards => {
        this.awards = awards;
      });
  }

  enter(current: Awards): void {
    this.hoverIndex = 1;
    this.current = current;
  }

  exit(): void {
    this.hoverIndex = 0;
  }

}
