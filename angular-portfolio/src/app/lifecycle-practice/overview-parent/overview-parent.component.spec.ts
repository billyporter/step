import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewParentComponent } from './overview-parent.component';

describe('OverviewParentComponent', () => {
  let component: OverviewParentComponent;
  let fixture: ComponentFixture<OverviewParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
