import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = '';

    this.authService
      .login(this.loginForm.value as { email: string; password: string })
      .subscribe({
        next: async (response) => {
          await this.authService.saveSession(response.token, response.role);
          this.redirectByRole(response.role);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage =
            err.error?.message || 'Login failed. Please try again.';
        },
      });
  }

  private redirectByRole(role: string) {
    const routes: Record<string, string> = {
      organizer: '/organizer/events',
      attendee: '/home',
      admin: '/home',
      staff: '/home',
    };

    this.router.navigateByUrl(routes[role] ?? '/home');
  }
}