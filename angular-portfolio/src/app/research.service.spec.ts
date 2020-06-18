import { TestBed } from '@angular/core/testing';
import { ResearchService } from './research.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ResearchService', () => {
  let service: ResearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [ HttpClientTestingModule ],
      providers: [ ResearchService ]
    });
    service = TestBed.inject(ResearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
