import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventPublicDetailComponent } from './event-public-detail.component';

describe('EventPublicDetailComponent', () => {
  let component: EventPublicDetailComponent;
  let fixture: ComponentFixture<EventPublicDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EventPublicDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventPublicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
