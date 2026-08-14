import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VenueListComponent } from './venue-list.component';

describe('VenueListComponent', () => {
  let component: VenueListComponent;
  let fixture: ComponentFixture<VenueListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VenueListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VenueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
