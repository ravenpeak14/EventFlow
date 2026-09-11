import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { getRouteForRole } from '../shared/role-routes';

export const guestGuard: CanActivateFn = async () => {
    const router = inject(Router);
    const { value: token } = await Preferences.get({ key: 'auth_token' });

    if (!token) {
        return true; // belum login, boleh akses /login atau /register
    }

    const { value: role } = await Preferences.get({ key: 'auth_role' });
    router.navigateByUrl(getRouteForRole(role));
    return false; // udah login, tendang ke halaman sendiri
};