import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TopViewComponent } from './top-view/top-view.component';
import { NameComponent } from './name/name.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BioComponent } from './bio/bio.component';
import { ResearchComponent } from './research/research.component';
import { AwardsComponent } from './awards/awards.component';
import { AwardDetailComponent } from './award-detail/award-detail.component';
import { HttpClientModule }    from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TopViewComponent,
    NameComponent,
    NavigationComponent,
    BioComponent,
    ResearchComponent,
    AwardsComponent,
    AwardDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
