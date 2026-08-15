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
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { EventService, EventItem } from '../../../services/event';

@Component({
  selector: 'app-pending-approvals',
  templateUrl: './pending-approvals.component.html',
  styleUrls: ['./pending-approvals.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonSpinner,
  ],
})
export class PendingApprovalsComponent implements OnInit {
  events: EventItem[] = [];
  loading = true;
  approvingId: number | null = null;
  errorMessage = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadPending();
  }

  loadPending() {
    this.loading = true;
    this.eventService.getPendingApprovals().subscribe({
      next: (response) => {
        this.events = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load pending approvals:', err);
        this.loading = false;
      },
    });
  }

  onApprove(event: EventItem) {
    this.approvingId = event.id;
    this.errorMessage = '';

    this.eventService.approveEvent(event.id).subscribe({
      next: () => {
        this.approvingId = null;
        this.events = this.events.filter((e) => e.id !== event.id);
      },
      error: (err) => {
        this.approvingId = null;
        this.errorMessage = err.error?.message || 'Failed to approve event.';
      },
    });
  }
}