import { TabBarItem } from './tab-bar/tab-bar.component';

export const attendeeTabs: TabBarItem[] = [
  { icon: 'home-outline', label: 'Home', route: '/home' },
  { icon: 'ticket-outline', label: 'Tickets', route: '/tickets' },
  { icon: 'receipt-outline', label: 'Orders', route: '/orders' },
  { icon: 'person-outline', label: 'Account', route: '/account' },
];

export const organizerTabs: TabBarItem[] = [
  { icon: 'calendar-outline', label: 'Events', route: '/organizer/events' },
  { icon: 'location-outline', label: 'Venues', route: '/organizer/venues' },
  { icon: 'person-outline', label: 'Account', route: '/account' },
];

export const adminTabs: TabBarItem[] = [
  { icon: 'checkmark-done-outline', label: 'Approvals', route: '/admin/pending-approvals' },
  { icon: 'person-outline', label: 'Account', route: '/account' },
];

export const staffTabs: TabBarItem[] = [
  { icon: 'qr-code-outline', label: 'Check-in', route: '/staff/check-in' },
  { icon: 'person-outline', label: 'Account', route: '/account' },
];