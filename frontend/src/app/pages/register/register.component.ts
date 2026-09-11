import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
  ],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required],
  });

  showPassword = false;
  errorMessage = '';
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.password_confirmation) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    this.authService
      .register(this.registerForm.value as {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
      })
      .subscribe({
        next: async (response) => {
          await this.authService.saveSession(response.token, response.role);
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.submitting = false;
          this.errorMessage = err.error?.message || 'Registration failed.';
        },
      });
  }
}