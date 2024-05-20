import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestsComponent } from './view-requests.component';

describe('ViewRequestsComponent', () => {
  let component: ViewRequestsComponent;
  let fixture: ComponentFixture<ViewRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRequestsComponent]
    });
    fixture = TestBed.createComponent(ViewRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
