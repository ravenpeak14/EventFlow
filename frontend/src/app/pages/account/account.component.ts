import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, logOutOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth';
import { TabBarComponent } from '../../shared/tab-bar/tab-bar.component';
import { TabBarItem } from '../../shared/tab-bar/tab-bar.component';
import { attendeeTabs, organizerTabs, adminTabs, staffTabs } from '../../shared/tab-configs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonSpinner, TabBarComponent],
})
export class AccountComponent implements OnInit {
  user: { name: string; email: string } | null = null;
  role = '';
  loading = true;
  tabs: TabBarItem[] = [];

  constructor(private authService: AuthService, private router: Router) {
    addIcons({ personCircleOutline, logOutOutline });
  }

  async ngOnInit() {
    const { value: role } = await Preferences.get({ key: 'auth_role' });
    this.role = role ?? '';
    this.tabs = this.getTabsForRole(this.role);

    this.authService.getMe().subscribe({
      next: (response) => {
        this.user = response.user;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  private getTabsForRole(role: string): TabBarItem[] {
    const map: Record<string, TabBarItem[]> = {
      attendee: attendeeTabs,
      organizer: organizerTabs,
      admin: adminTabs,
      staff: staffTabs,
    };
    return map[role] ?? attendeeTabs;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.finishLogout(),
      error: () => this.finishLogout(),
    });
  }

  private async finishLogout() {
    await this.authService.clearSession();
    this.router.navigateByUrl('/login');
  }
}