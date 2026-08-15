import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonBadge,
  IonButton,
  IonIcon,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import { EventService, EventItem } from '../../../services/event';
import { TicketTypeService, TicketTypeItem } from '../../../services/ticket-type';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonBadge,
    IonButton,
    IonIcon,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class EventDetailComponent implements OnInit {
  event: EventItem | null = null;
  ticketTypes: TicketTypeItem[] = [];
  loading = true;
  actionLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private ticketTypeService: TicketTypeService
  ) {
    addIcons({ addOutline, trashOutline });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEvent(id);
    this.loadTicketTypes(id);
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

  loadTicketTypes(eventId: number) {
    this.ticketTypeService.getByEvent(eventId).subscribe({
      next: (response) => {
        this.ticketTypes = response.data;
      },
      error: (err) => {
        console.error('Failed to load ticket types:', err);
      },
    });
  }

  deleteTicketType(ticketType: TicketTypeItem) {
    if (!this.event) return;

    this.ticketTypeService.delete(this.event.id, ticketType.id).subscribe({
      next: () => {
        this.ticketTypes = this.ticketTypes.filter((t) => t.id !== ticketType.id);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to delete ticket type.';
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