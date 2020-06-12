import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { OverviewParentComponent } from './overview-parent/overview-parent.component';
import { LifecycleDirective } from './lifecycle.directive';


@NgModule({
  declarations: [OverviewComponent, OverviewParentComponent, LifecycleDirective],
  imports: [
    CommonModule,
  ],
  exports: [
    OverviewComponent,
    OverviewParentComponent
  ],
  providers: []
})
export class LifecyclePracticeModule { }
