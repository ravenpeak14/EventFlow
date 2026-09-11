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
import { VenueService, VenueItem } from '../../../services/venue';
import { addOutline, locationOutline } from 'ionicons/icons';
import { TabBarComponent, TabBarItem } from '../../../shared/tab-bar/tab-bar.component';
import { organizerTabs } from '../../../shared/tab-configs';

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
    TabBarComponent,
  ],
})
export class VenueListComponent implements OnInit {
  venues: VenueItem[] = [];
  loading = true;
  tabs: TabBarItem[] = organizerTabs;

  constructor(private venueService: VenueService) {
    addIcons({ addOutline, locationOutline });
  }

  ngOnInit() {
    this.loadVenues();
  }

  ionViewWillEnter() {
    this.loadVenues();
  }

  private loadVenues() {
    this.loading = true;
    this.venueService.getAll().subscribe({
      next: (response) => {
        this.venues = response.data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}