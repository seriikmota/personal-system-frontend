import { TestBed } from '@angular/core/testing';

import { MensageiroService } from './mensageiro.service';

describe('MensageiroService', () => {
  let service: MensageiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensageiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
