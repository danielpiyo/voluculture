import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoDashboardComponent } from './ngo-dashboard.component';

describe('NgoDashboardComponent', () => {
  let component: NgoDashboardComponent;
  let fixture: ComponentFixture<NgoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
