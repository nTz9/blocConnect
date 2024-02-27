import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEstatePropertiesComponent } from './user-estate-properties.component';

describe('UserEstatePropertiesComponent', () => {
  let component: UserEstatePropertiesComponent;
  let fixture: ComponentFixture<UserEstatePropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEstatePropertiesComponent]
    });
    fixture = TestBed.createComponent(UserEstatePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
