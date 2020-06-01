import { Component, OnInit } from '@angular/core';
import { AwardsService } from '../awards.service';
import { Awards } from '../awards-template';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {

  awards: Awards[];
  selectedAwardYear: number;

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

  onSelect(award: Awards): void {
    this.selectedAwardYear = award.year;
  }

}
