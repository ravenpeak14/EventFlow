import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonBadge, IonSpinner, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';
import { TicketService, TicketItem } from '../../services/ticket';
import * as QRCode from 'qrcode';
import { TabBarComponent, TabBarItem } from '../../shared/tab-bar/tab-bar.component';
import { attendeeTabs } from '../../shared/tab-configs';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonBadge, IonSpinner, IonIcon, TabBarComponent,],

})
export class MyTicketsComponent implements OnInit {
  tickets: TicketItem[] = [];
  qrImages: Record<number, string> = {};
  loading = true;
  tabs: TabBarItem[] = attendeeTabs;

  constructor(private ticketService: TicketService) {
    addIcons({ calendarOutline });
  }

  ngOnInit() {
    this.loadTickets();
  }

  ionViewWillEnter() {
    this.loadTickets();
  }

  private loadTickets() {
    this.loading = true;
    this.qrImages = {};
    this.ticketService.getMyTickets().subscribe({
      next: async (response) => {
        this.tickets = response.data;
        this.loading = false;
        for (const ticket of this.tickets) {
          this.qrImages[ticket.id] = await QRCode.toDataURL(ticket.ticket_code, { width: 220, margin: 1 });
        }
      },
      error: (err) => {
        console.error('Failed to load tickets:', err);
        this.loading = false;
      },
    });
  }

  statusColor(status: string): string {
    const colors: Record<string, string> = { valid: 'success', used: 'medium', cancelled: 'danger' };
    return colors[status] ?? 'medium';
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }
}