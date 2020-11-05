import { TestBed } from '@angular/core/testing';

import { EBankingService } from './e-banking.service';

describe('EBankingService', () => {
  let service: EBankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EBankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
