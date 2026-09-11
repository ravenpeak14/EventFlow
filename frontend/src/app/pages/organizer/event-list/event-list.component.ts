import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, calendarOutline, chevronForwardOutline } from 'ionicons/icons';
import { EventService, EventItem } from '../../../services/event';
import { TabBarComponent, TabBarItem } from '../../../shared/tab-bar/tab-bar.component';
import { organizerTabs } from '../../../shared/tab-configs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonSpinner, TabBarComponent],

})
export class EventListComponent implements OnInit {
  tabs: TabBarItem[] = organizerTabs;
  events: EventItem[] = [];
  loading = true;



  constructor(private eventService: EventService) {
    addIcons({ addOutline, calendarOutline, chevronForwardOutline });
  }

  ngOnInit() {
    this.loadEvents();
  }

  ionViewWillEnter() {
    this.loadEvents();
  }

  private loadEvents() {
    this.loading = true;
    this.eventService.getMyEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  statusColor(status: string): string {
    const colors: Record<string, string> = {
      draft: 'medium', submitted: 'warning', approved: 'tertiary',
      published: 'success', ongoing: 'primary', completed: 'dark', cancelled: 'danger',
    };
    return colors[status] ?? 'medium';
  }
}