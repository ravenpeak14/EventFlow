import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { rootGuard } from './guards/root-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },


  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
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
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [rootGuard],
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
  {
    path: 'organizer/events/:id/edit',
    loadComponent: () =>
      import('./pages/organizer/event-edit/event-edit.component').then(
        (m) => m.EventEditComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'admin/pending-approvals',
    loadComponent: () =>
      import('./pages/admin/pending-approvals/pending-approvals.component').then(
        (m) => m.PendingApprovalsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'organizer/events/:id/ticket-types/create',
    loadComponent: () =>
      import('./pages/organizer/ticket-type-create/ticket-type-create.component').then(
        (m) => m.TicketTypeCreateComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'events/:id',
    loadComponent: () =>
      import('./pages/event-public-detail/event-public-detail.component').then(
        (m) => m.EventPublicDetailComponent
      ),
  },

  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/my-orders/my-orders.component').then(
        (m) => m.MyOrdersComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./pages/order-detail/order-detail.component').then(
        (m) => m.OrderDetailComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'tickets',
    loadComponent: () =>
      import('./pages/my-tickets/my-tickets.component').then(
        (m) => m.MyTicketsComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'staff/check-in',
    loadComponent: () =>
      import('./pages/staff/check-in/check-in.component').then(
        (m) => m.CheckInComponent
      ),
    canActivate: [authGuard],
  },


  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent),
    canActivate: [guestGuard],
  },

  {
    path: 'account',
    loadComponent: () => import('./pages/account/account.component').then((m) => m.AccountComponent),
    canActivate: [authGuard],
  },
];