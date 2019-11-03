import { TestBed } from '@angular/core/testing';

import { OrdensService } from './ordens.service';

describe('OrdensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdensService = TestBed.get(OrdensService);
    expect(service).toBeTruthy();
  });
});
