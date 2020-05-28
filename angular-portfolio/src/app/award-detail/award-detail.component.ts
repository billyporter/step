import { Component, OnInit, Input } from '@angular/core';
import { Awards } from '../awardsTemplate';
import { AwardsService } from '../awards.service';

@Component({
  selector: 'app-award-detail',
  templateUrl: './award-detail.component.html',
  styleUrls: ['./award-detail.component.scss']
})
export class AwardDetailComponent implements OnInit {

  awards: Awards[];
  @Input() award: Awards;
  hoverIndex: number;
  current:  Awards;

  constructor(private awardService: AwardsService) { }

  ngOnInit(): void {
    this.getAwards();
  }

  getAwards(): void {
    this.awardService.getAwards()
      .subscribe(awards => this.awards = awards);
  }

  enter(current: Awards) {

    this.hoverIndex = 1;
    this.current = current;
  }

  exit() {
    this.hoverIndex = 0;
    console.log('enter');
  }

}
