import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  IonButton,
} from '@ionic/angular/standalone';
import { VenueService } from '../../../services/venue';

@Component({
  selector: 'app-venue-create',
  templateUrl: './venue-create.component.html',
  styleUrls: ['./venue-create.component.scss'],
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
    IonButton,
  ],
})
export class VenueCreateComponent {
  venueForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    map_url: [''],
  });

  errorMessage = '';
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private venueService: VenueService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.venueForm.invalid) {
      this.venueForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const raw = this.venueForm.value;

    this.venueService
      .create({
        name: raw.name!,
        address: raw.address!,
        city: raw.city!,
        map_url: raw.map_url || undefined,
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigateByUrl('/organizer/venues');
        },
        error: (err) => {
          console.error('Failed to create venue:', err);
          this.submitting = false;
          this.errorMessage = err.error?.message || 'Failed to create venue.';
        },
      });
  }
}