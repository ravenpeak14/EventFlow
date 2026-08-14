import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'organizer/events',
    loadComponent: () =>
      import('./pages/organizer/event-list/event-list.component').then(
        (m) => m.EventListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'organizer/events/create',
    loadComponent: () =>
      import('./pages/organizer/event-create/event-create.component').then(
        (m) => m.EventCreateComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'organizer/events/:id',
    loadComponent: () =>
      import('./pages/organizer/event-detail/event-detail.component').then(
        (m) => m.EventDetailComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'organizer/venues',
    loadComponent: () =>
      import('./pages/organizer/venue-list/venue-list.component').then(
        (m) => m.VenueListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'organizer/venues/create',
    loadComponent: () =>
      import('./pages/organizer/venue-create/venue-create.component').then(
        (m) => m.VenueCreateComponent
      ),
    canActivate: [authGuard],
  },
];