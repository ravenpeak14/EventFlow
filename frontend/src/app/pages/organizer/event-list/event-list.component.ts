import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonSpinner,
} from '@ionic/angular/standalone';
import { EventService, EventItem } from '../../../services/event';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonSpinner,
  ],
})
export class EventListComponent implements OnInit {
  events: EventItem[] = [];
  loading = true;
  errorMessage = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getMyEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load events:', err);
        this.errorMessage = 'Failed to load events.';
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
}