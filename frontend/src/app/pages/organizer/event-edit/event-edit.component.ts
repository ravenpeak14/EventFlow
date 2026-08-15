import { Component, OnInit } from '@angular/core';
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
  IonSelect,
  IonSelectOption,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { EventService } from '../../../services/event';
import {
  EventCategoryService,
  EventCategoryItem,
} from '../../../services/event-category';
import { VenueService, VenueItem } from '../../../services/venue';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
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
    IonSpinner,
  ],
})
export class EventEditComponent implements OnInit {
  eventId!: number;
  categories: EventCategoryItem[] = [];
  venues: VenueItem[] = [];
  loading = true;
  submitting = false;
  errorMessage = '';

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
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private categoryService: EventCategoryService,
    private venueService: VenueService
  ) { }

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

    this.categoryService.getAll().subscribe({
      next: (response) => (this.categories = response.data),
    });

    this.venueService.getAll().subscribe({
      next: (response) => (this.venues = response.data),
    });

    this.eventService.getMyEventDetail(this.eventId).subscribe({
      next: (response) => {
        const event = response.data;
        this.eventForm.patchValue({
          event_category_id: event.category?.id ?? null,
          venue_id: event.venue?.id ?? null,
          name: event.name,
          description: event.description,
          start_date: event.start_date,
          end_date: event.end_date,
          start_time: event.start_time?.substring(0, 5),
          end_time: event.end_time?.substring(0, 5),
          capacity: event.capacity,
        } as any);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load event:', err);
        this.errorMessage = 'Failed to load event.';
        this.loading = false;
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
      .updateEvent(this.eventId, {
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
          this.router.navigateByUrl(`/organizer/events/${this.eventId}`);
        },
        error: (err) => {
          console.error('Failed to update event:', err);
          this.submitting = false;
          this.errorMessage =
            err.error?.message || 'Failed to update event.';
        },
      });
  }
}