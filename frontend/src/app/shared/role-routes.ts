export function getRouteForRole(role?: string | null): string {
    const routes: Record<string, string> = {
        organizer: '/organizer/events',
        admin: '/admin/pending-approvals',
        staff: '/staff/check-in',
        attendee: '/home',
    };
    return routes[role ?? ''] ?? '/home';
}