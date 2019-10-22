import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesEventsComponent } from './activities-events.component';

describe('ActivitiesEventsComponent', () => {
  let component: ActivitiesEventsComponent;
  let fixture: ComponentFixture<ActivitiesEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
