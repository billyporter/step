
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const Material = [
  MatButtonModule,
  MatCardModule,
  MatTabsModule,
  MatToolbarModule,
  MatButtonToggleModule
];

@NgModule({
  imports: [ Material ],
  exports: [ Material ]
})
export class MaterialModule { }

