import { TestBed } from '@angular/core/testing';

import { ColorDataService } from './color-data.service';

describe('ColorDataService', () => {
  let service: ColorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
