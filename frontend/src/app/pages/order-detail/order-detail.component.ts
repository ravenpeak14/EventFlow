import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { OrderService, OrderResult } from '../../services/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonButton,
    IonSpinner,
  ],
})
export class OrderDetailComponent implements OnInit {
  order: OrderResult | null = null;
  loading = true;
  submitting = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getDetail(id).subscribe({
      next: (response) => {
        this.order = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load order:', err);
        this.loading = false;
      },
    });
  }

  statusColor(status: string): string {
    const colors: Record<string, string> = {
      pending: 'warning',
      paid: 'success',
      expired: 'medium',
      cancelled: 'danger',
    };
    return colors[status] ?? 'medium';
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