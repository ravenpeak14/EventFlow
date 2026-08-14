import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VenueCreateComponent } from './venue-create.component';

describe('VenueCreateComponent', () => {
  let component: VenueCreateComponent;
  let fixture: ComponentFixture<VenueCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VenueCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VenueCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
