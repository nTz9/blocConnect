import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnnouncementsComponent } from './view-announcements.component';

describe('ViewAnnouncementsComponent', () => {
  let component: ViewAnnouncementsComponent;
  let fixture: ComponentFixture<ViewAnnouncementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAnnouncementsComponent]
    });
    fixture = TestBed.createComponent(ViewAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
