import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
import { OrderService, OrderResult } from '../../services/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
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
export class MyOrdersComponent implements OnInit {
  orders: OrderResult[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getMyOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
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
}