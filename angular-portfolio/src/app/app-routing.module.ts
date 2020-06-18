import { OverviewParentComponent } from './lifecycle-practice/overview-parent/overview-parent.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopViewComponent } from './top-view/top-view.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AwardsComponent } from './awards/awards.component';

const routes: Routes = [
  { path: '', redirectTo: '/congress', pathMatch: 'full' },
  { path: 'congress', component: TopViewComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'awards', component: AwardsComponent },
  { path: 'lifecycle', component: OverviewParentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
