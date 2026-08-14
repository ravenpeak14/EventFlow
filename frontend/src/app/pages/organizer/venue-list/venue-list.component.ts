import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { VenueService, VenueItem } from '../../../services/venue';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
  ],
})
export class VenueListComponent implements OnInit {
  venues: VenueItem[] = [];
  loading = true;

  constructor(private venueService: VenueService) {
    addIcons({ addOutline });
  }

  ngOnInit() {
    this.venueService.getAll().subscribe({
      next: (response) => {
        this.venues = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load venues:', err);
        this.loading = false;
      },
    });
  }
}