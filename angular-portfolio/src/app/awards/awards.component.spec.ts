import { AwardsService } from './../awards.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AwardsComponent } from './awards.component';
import { Awards } from '../awards-template';
import { asyncData } from 'testing/async-observable-helpers';
import { of } from 'rxjs';

describe('AwardsComponent', () => {
  let component: AwardsComponent;
  let fixture: ComponentFixture<AwardsComponent>;
  let testAwards: Awards[];
  let getAwardSpy: jasmine.Spy;
  const mockAward: Awards = { year: 2050, image: '../test.png', description: 'test'};

  beforeEach(async(() => {

    testAwards = [ { year: 2051, image: '../test1.png', description: 'test1'},
                   { year: 2052, image: '../test2.png', description: 'test2'} ];

    // Create a fake Awards Service with a getAwards spy
    const awardsService = jasmine.createSpyObj('AwardsService', ['getAwards']);
    // make the spy return a synchronou sobservable with test data
    getAwardSpy = awardsService.getAwards.and.returnValue ( of(testAwards) );

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AwardsComponent,
      { provide: AwardsService, useValue: awardsService } ],
      declarations: [ AwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onSelect(award) should set #selectedAwardYear to award', () => {
    expect(component.selectedAwardYear).toBeUndefined();
    component.onSelect(mockAward);
    expect(component.selectedAwardYear).toMatch('2050');
  });

  describe('when test with asynchronous observable', () => {
    beforeEach(() => {
      getAwardSpy.and.returnValue(asyncData(testAwards));
    });

    it('should fetch correctly', () => {
      expect(component.awards).toBe(testAwards);
    });
  });
});
