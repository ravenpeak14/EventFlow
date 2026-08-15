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
  IonSpinner,
} from '@ionic/angular/standalone';
import { EventService, EventItem } from '../services/event';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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
    IonSpinner,
  ],
})
export class HomePage implements OnInit {
  events: EventItem[] = [];
  loading = true;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getPublicEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load events:', err);
        this.loading = false;
      },
    });
  }
}