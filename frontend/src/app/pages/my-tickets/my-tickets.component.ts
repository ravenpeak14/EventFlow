import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonSpinner,
} from '@ionic/angular/standalone';
import { TicketService, TicketItem } from '../../services/ticket';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonBadge,
    IonSpinner,
  ],
})
export class MyTicketsComponent implements OnInit {
  tickets: TicketItem[] = [];
  qrImages: Record<number, string> = {};
  loading = true;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.getMyTickets().subscribe({
      next: async (response) => {
        this.tickets = response.data;
        this.loading = false;

        for (const ticket of this.tickets) {
          this.qrImages[ticket.id] = await QRCode.toDataURL(ticket.ticket_code, {
            width: 200,
            margin: 1,
          });
        }
      },
      error: (err) => {
        console.error('Failed to load tickets:', err);
        this.loading = false;
      },
    });
  }

  statusColor(status: string): string {
    const colors: Record<string, string> = {
      valid: 'success',
      used: 'medium',
      cancelled: 'danger',
    };
    return colors[status] ?? 'medium';
  }
}