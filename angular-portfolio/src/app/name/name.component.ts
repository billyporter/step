import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent {

  onExplore(): void {
    window.scrollTo({top: 500, left: 1200, behavior: 'smooth'});
  }

}
