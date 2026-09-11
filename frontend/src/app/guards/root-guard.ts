import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { getRouteForRole } from '../shared/role-routes';

export const rootGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const { value: token } = await Preferences.get({ key: 'auth_token' });
  const { value: role } = await Preferences.get({ key: 'auth_role' });

  router.navigateByUrl(token ? getRouteForRole(role) : '/home');
  return false;
};