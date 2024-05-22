import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApartamentsComponent } from './view-apartaments.component';

describe('ViewApartamentsComponent', () => {
  let component: ViewApartamentsComponent;
  let fixture: ComponentFixture<ViewApartamentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewApartamentsComponent]
    });
    fixture = TestBed.createComponent(ViewApartamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
