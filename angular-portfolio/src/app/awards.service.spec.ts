import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AwardsService } from './awards.service';

describe('AwardsService', () => {
  let service: AwardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AwardsService ]
    });
    service = TestBed.inject(AwardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
