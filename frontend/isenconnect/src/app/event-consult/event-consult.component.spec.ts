import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConsultComponent } from './event-consult.component';

describe('EventConsultComponent', () => {
  let component: EventConsultComponent;
  let fixture: ComponentFixture<EventConsultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventConsultComponent]
    });
    fixture = TestBed.createComponent(EventConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
