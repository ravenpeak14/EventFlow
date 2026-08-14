import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonBadge,
  IonButton,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { EventService, EventItem } from '../../../services/event';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonBadge,
    IonButton,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class EventDetailComponent implements OnInit {
  event: EventItem | null = null;
  loading = true;
  actionLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEvent(id);
  }

  loadEvent(id: number) {
    this.loading = true;
    this.eventService.getMyEventDetail(id).subscribe({
      next: (response) => {
        this.event = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load event:', err);
        this.errorMessage = 'Failed to load event.';
        this.loading = false;
      },
    });
  }

  statusColor(status: string): string {
    const colors: Record<string, string> = {
      draft: 'medium',
      submitted: 'warning',
      approved: 'tertiary',
      published: 'success',
      ongoing: 'primary',
      completed: 'dark',
      cancelled: 'danger',
    };
    return colors[status] ?? 'medium';
  }

  onSubmit() {
    if (!this.event) return;
    this.actionLoading = true;
    this.eventService.submitEvent(this.event.id).subscribe({
      next: (response) => {
        this.event = response.data;
        this.actionLoading = false;
      },
      error: (err) => {
        this.actionLoading = false;
        this.errorMessage = err.error?.message || 'Action failed.';
      },
    });
  }

  onPublish() {
    if (!this.event) return;
    this.actionLoading = true;
    this.eventService.publishEvent(this.event.id).subscribe({
      next: (response) => {
        this.event = response.data;
        this.actionLoading = false;
      },
      error: (err) => {
        this.actionLoading = false;
        this.errorMessage = err.error?.message || 'Action failed.';
      },
    });
  }

  onCancel() {
    if (!this.event) return;
    this.actionLoading = true;
    this.eventService.cancelEvent(this.event.id).subscribe({
      next: (response) => {
        this.event = response.data;
        this.actionLoading = false;
      },
      error: (err) => {
        this.actionLoading = false;
        this.errorMessage = err.error?.message || 'Action failed.';
      },
    });
  }
}