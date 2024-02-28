import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterMeterComponent } from './water-meter.component';

describe('WaterMeterComponent', () => {
  let component: WaterMeterComponent;
  let fixture: ComponentFixture<WaterMeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterMeterComponent]
    });
    fixture = TestBed.createComponent(WaterMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
