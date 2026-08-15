import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TicketTypeCreateComponent } from './ticket-type-create.component';

describe('TicketTypeCreateComponent', () => {
  let component: TicketTypeCreateComponent;
  let fixture: ComponentFixture<TicketTypeCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TicketTypeCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
