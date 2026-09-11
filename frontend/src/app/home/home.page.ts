import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonChip,
  IonLabel,
  IonIcon,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  calendarOutline,
  musicalNotesOutline,
  footballOutline,
  constructOutline,
  hardwareChipOutline,
  briefcaseOutline,
  peopleOutline,
  pricetagOutline,
} from 'ionicons/icons';
import { EventService, EventItem } from '../services/event';
import { EventCategoryService, EventCategoryItem } from '../services/event-category';
import { getCategoryIcon, getCategoryGradient } from '../shared/category-visuals';
import { TabBarComponent, TabBarItem } from '../shared/tab-bar/tab-bar.component';
import { attendeeTabs } from '../shared/tab-configs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonChip,
    IonLabel,
    IonIcon,
    IonSpinner,
    TabBarComponent,
  ],


})
export class HomePage implements OnInit {
  events: EventItem[] = [];
  categories: EventCategoryItem[] = [];
  loading = true;
  searchTerm = '';
  selectedCategorySlug: string | null = null;
  tabs: TabBarItem[] = attendeeTabs;

  private categoryIcons: Record<string, string> = {
    music: 'musical-notes-outline',
    sport: 'football-outline',
    workshop: 'construct-outline',
    technology: 'hardware-chip-outline',
    business: 'briefcase-outline',
    conference: 'people-outline',
  };

  private categoryGradients: Record<string, string> = {
    music: 'linear-gradient(135deg, #ff5a3c, #ff9a3c)',
    sport: 'linear-gradient(135deg, #2d7d9a, #4fc3d9)',
    workshop: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    technology: 'linear-gradient(135deg, #1a1a2e, #414169)',
    business: 'linear-gradient(135deg, #1e9e6b, #4ecb96)',
    conference: 'linear-gradient(135deg, #e5484d, #ff8a8f)',
  };

  constructor(
    private eventService: EventService,
    private categoryService: EventCategoryService
  ) {
    addIcons({
      locationOutline,
      calendarOutline,
      musicalNotesOutline,
      footballOutline,
      constructOutline,
      hardwareChipOutline,
      briefcaseOutline,
      peopleOutline,
      pricetagOutline,
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  private loadData() {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: (response) => (this.categories = response.data),
    });
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

  get filteredEvents(): EventItem[] {
    return this.events.filter((event) => {
      const matchesSearch =
        !this.searchTerm ||
        event.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        !this.selectedCategorySlug || event.category?.slug === this.selectedCategorySlug;
      return matchesSearch && matchesCategory;
    });
  }

  toggleCategory(slug: string) {
    this.selectedCategorySlug = this.selectedCategorySlug === slug ? null : slug;
  }

  categoryIcon(slug?: string): string {
    return getCategoryIcon(slug);
  }

  categoryGradient(slug?: string): string {
    return getCategoryGradient(slug);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}