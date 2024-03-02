import { TestBed } from '@angular/core/testing';

import { WaterMeterService } from './water-meter.service';

describe('WaterMeterService', () => {
  let service: WaterMeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterMeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
