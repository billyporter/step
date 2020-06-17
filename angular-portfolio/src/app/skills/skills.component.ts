import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SKILLS } from '../skillsdata';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

    SKILLS: any[];

    // options
    barPadding = 20;
    gradient = false;
    showLegend = true;
    showXAxis = true;
    showYAxis = true;
    showYAxisLabel = true;
    view: number[] = [1000, 350];
    xAxisLabel = 'Percent';
    yAxisLabel = 'Skill';

    colorScheme = {
      domain: ['#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5']
    };

    constructor() {
      Object.assign(this, { SKILLS });
    }

    onSelect(data: any): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate(data: any): void {
      console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data: any): void {
      console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }

    formatPercent(val: number) {
        if (val <= 100) {
            return val + '%';
        }
    }
}
