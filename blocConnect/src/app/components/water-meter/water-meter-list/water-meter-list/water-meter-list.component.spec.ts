import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterMeterListComponent } from './water-meter-list.component';

describe('WaterMeterListComponent', () => {
  let component: WaterMeterListComponent;
  let fixture: ComponentFixture<WaterMeterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterMeterListComponent]
    });
    fixture = TestBed.createComponent(WaterMeterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
