import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonBadge, IonSpinner, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { receiptOutline, chevronForwardOutline } from 'ionicons/icons';
import { OrderService, OrderResult } from '../../services/order';
import { TabBarComponent, TabBarItem } from '../../shared/tab-bar/tab-bar.component';
import { attendeeTabs } from '../../shared/tab-configs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonBadge, IonSpinner, IonIcon, TabBarComponent,],

})
export class MyOrdersComponent implements OnInit {
  orders: OrderResult[] = [];
  loading = true;
  tabs: TabBarItem[] = attendeeTabs;

  constructor(private orderService: OrderService) {
    addIcons({ receiptOutline, chevronForwardOutline });
  }

  ngOnInit() {
    this.loadOrders();
  }

  ionViewWillEnter() {
    this.loadOrders();
  }

  private loadOrders() {
    this.loading = true;
    this.orderService.getMyOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  statusColor(status: string): string {
    const colors: Record<string, string> = { pending: 'warning', paid: 'success', expired: 'medium', cancelled: 'danger' };
    return colors[status] ?? 'medium';
  }
}