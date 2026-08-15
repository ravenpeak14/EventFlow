import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from '@ionic/angular/standalone';
import { TicketTypeService } from '../../../services/ticket-type';

@Component({
  selector: 'app-ticket-type-create',
  templateUrl: './ticket-type-create.component.html',
  styleUrls: ['./ticket-type-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
  ],
})
export class TicketTypeCreateComponent {
  eventId: number;

  ticketForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [null as number | null, [Validators.required, Validators.min(0)]],
    quota: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  errorMessage = '';
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketTypeService: TicketTypeService
  ) {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onSubmit() {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const raw = this.ticketForm.value;

    this.ticketTypeService
      .create(this.eventId, {
        name: raw.name!,
        description: raw.description || undefined,
        price: Number(raw.price),
        quota: Number(raw.quota),
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigateByUrl(`/organizer/events/${this.eventId}`);
        },
        error: (err) => {
          console.error('Failed to create ticket type:', err);
          this.submitting = false;
          this.errorMessage =
            err.error?.message || 'Failed to create ticket type.';
        },
      });
  }
}