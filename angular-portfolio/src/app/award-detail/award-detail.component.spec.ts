import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardDetailComponent } from './award-detail.component';

describe('AwardDetailComponent', () => {
  let component: AwardDetailComponent;
  let fixture: ComponentFixture<AwardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
