import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonList,
} from '@ionic/angular/standalone';
import { EventService, EventItem } from '../../../services/event';
import { CheckInService } from '../../../services/check-in';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import { TabBarComponent, TabBarItem } from '../../../shared/tab-bar/tab-bar.component';
import { staffTabs } from '../../../shared/tab-configs';

interface CheckInLogEntry {
  ticketCode: string;
  success: boolean;
  message: string;
  attendeeName?: string;
  ticketType?: string;
}

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
    IonList,
    IonIcon,
    TabBarComponent,
  ],
})
export class CheckInComponent implements OnInit {
  events: EventItem[] = [];
  selectedEventId: number | null = null;
  ticketCode = '';
  submitting = false;
  log: CheckInLogEntry[] = [];
  tabs: TabBarItem[] = staffTabs;


  constructor(
    private eventService: EventService,
    private checkInService: CheckInService

  ) { addIcons({ checkmarkCircle, closeCircle }); }

  ngOnInit() {
    this.loadEvents();
  }

  ionViewWillEnter() {
    this.loadEvents();
    this.log = []; // riwayat scan staff sebelumnya jangan ikut nyangkut
  }

  private loadEvents() {
    this.eventService.getPublicEvents().subscribe({
      next: (response) => {
        this.events = response.data;
      },
      error: (err) => console.error('Failed to load events:', err),
    });
  }

  submit() {
    if (!this.selectedEventId || !this.ticketCode.trim()) return;

    this.submitting = true;
    const code = this.ticketCode.trim();

    this.checkInService.checkIn(this.selectedEventId, code).subscribe({
      next: (response) => {
        this.log.unshift({
          ticketCode: code,
          success: true,
          message: response.message,
          attendeeName: response.data.attendee_name,
          ticketType: response.data.ticket_type,
        });
        this.ticketCode = '';
        this.submitting = false;
      },
      error: (err) => {
        this.log.unshift({
          ticketCode: code,
          success: false,
          message: err.error?.message || 'Check-in failed.',
        });
        this.ticketCode = '';
        this.submitting = false;
      },
    });
  }
}