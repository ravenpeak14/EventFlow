import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { from, switchMap, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return from(Preferences.get({ key: 'auth_token' })).pipe(
    switchMap(({ value: token }) => {
      const cloned = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

      return next(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          const isAuthEndpoint = req.url.includes('/login') || req.url.includes('/register');

          if (error.status === 401 && !isAuthEndpoint) {
            Preferences.remove({ key: 'auth_token' });
            Preferences.remove({ key: 'auth_role' });
            router.navigateByUrl('/login');
          }

          return throwError(() => error);
        })
      );
    })
  );
};