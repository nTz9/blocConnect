import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlocksComponent } from './view-blocks.component';

describe('ViewBlocksComponent', () => {
  let component: ViewBlocksComponent;
  let fixture: ComponentFixture<ViewBlocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBlocksComponent]
    });
    fixture = TestBed.createComponent(ViewBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
