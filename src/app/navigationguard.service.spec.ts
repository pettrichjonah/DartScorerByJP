import { TestBed } from '@angular/core/testing';

import { NavigationguardService } from './navigationguard.service';

describe('NavigationguardService', () => {
  let service: NavigationguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
