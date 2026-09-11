import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonFooter,
  IonButton,
  IonIcon,
  IonSpinner,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  locationOutline,
  timeOutline,
  removeOutline,
  addOutline,
  checkmarkCircle,
} from 'ionicons/icons';
import { EventService, EventItem } from '../../services/event';
import { OrderService, OrderResult } from '../../services/order';
import { getCategoryIcon, getCategoryGradient } from '../../shared/category-visuals';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-event-public-detail',
  templateUrl: './event-public-detail.component.html',
  styleUrls: ['./event-public-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonFooter,
    IonButton,
    IonIcon,
    IonSpinner,
    IonBadge,
  ],
})
export class EventPublicDetailComponent implements OnInit {
  event: EventItem | null = null;
  loading = true;
  quantities: Record<number, number> = {};
  submitting = false;
  errorMessage = '';
  order: OrderResult | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private orderService: OrderService
  ) {
    addIcons({
      calendarOutline,
      locationOutline,
      timeOutline,
      removeOutline,
      addOutline,
      checkmarkCircle,
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEvent(id);
  }

  loadEvent(id: number) {
    this.loading = true;
    this.eventService.getPublicDetail(id).subscribe({
      next: (response) => {
        this.event = response.data;
        this.event.ticket_types?.forEach((t) => (this.quantities[t.id] = 0));
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load event:', err);
        this.loading = false;
      },
    });
  }

  categoryIcon(slug?: string): string {
    return getCategoryIcon(slug);
  }

  categoryGradient(slug?: string): string {
    return getCategoryGradient(slug);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  get totalPrice(): number {
    if (!this.event?.ticket_types) return 0;
    return this.event.ticket_types.reduce(
      (sum, t) => sum + (this.quantities[t.id] || 0) * t.price,
      0
    );
  }

  get totalTickets(): number {
    return Object.values(this.quantities).reduce((sum, q) => sum + q, 0);
  }

  increment(ticketId: number, maxQuota: number) {
    if (this.quantities[ticketId] < maxQuota) {
      this.quantities[ticketId]++;
    }
  }

  decrement(ticketId: number) {
    if (this.quantities[ticketId] > 0) {
      this.quantities[ticketId]--;
    }
  }

  async checkout() {
    if (!this.event || this.totalTickets === 0) return;

    const { value: token } = await Preferences.get({ key: 'auth_token' });
    if (!token) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const items = Object.entries(this.quantities)
      .filter(([, qty]) => qty > 0)
      .map(([ticketTypeId, quantity]) => ({
        ticket_type_id: Number(ticketTypeId),
        quantity,
      }));

    this.orderService.create(this.event.id, items).subscribe({
      next: (response) => {
        this.order = response.data;
        this.submitting = false;
      },
      error: (err) => {
        console.error('Failed to create order:', err);
        this.errorMessage = err.error?.message || 'Failed to create order.';
        this.submitting = false;
      },
    });
  }

  payNow() {
    if (!this.order) return;
    this.submitting = true;
    this.orderService.pay(this.order.id).subscribe({
      next: (response) => {
        this.order = response.data;
        this.submitting = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Payment failed.';
        this.submitting = false;
      },
    });
  }
}