import { Component, OnInit } from '@angular/core';
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
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular/standalone';
import { EventService } from '../../../services/event';
import {
  EventCategoryService,
  EventCategoryItem,
} from '../../../services/event-category';
import { VenueService, VenueItem } from '../../../services/venue';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
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
    IonSelect,
    IonSelectOption,
    IonButton,
  ],
})
export class EventCreateComponent implements OnInit {
  categories: EventCategoryItem[] = [];
  venues: VenueItem[] = [];
  errorMessage = '';
  submitting = false;

  eventForm = this.fb.group({
    event_category_id: [null, Validators.required],
    venue_id: [null as number | null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
    capacity: [null as number | null],
  });

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private categoryService: EventCategoryService,
    private venueService: VenueService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      },
    });

    this.venueService.getAll().subscribe({
      next: (response) => {
        this.venues = response.data;
      },
      error: (err) => {
        console.error('Failed to load venues:', err);
      },
    });
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const raw = this.eventForm.value;

    this.eventService
      .createEvent({
        event_category_id: Number(raw.event_category_id),
        venue_id: raw.venue_id ?? undefined,
        name: raw.name!,
        description: raw.description!,
        start_date: raw.start_date!,
        end_date: raw.end_date!,
        start_time: raw.start_time!,
        end_time: raw.end_time!,
        capacity: raw.capacity ?? undefined,
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigateByUrl('/organizer/events');
        },
        error: (err) => {
          console.error('Failed to create event:', err);
          this.submitting = false;
          this.errorMessage =
            err.error?.message || 'Failed to create event. Please check your input.';
        },
      });
  }
}