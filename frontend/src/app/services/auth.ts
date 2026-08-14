import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  message: string;
  user: { id: number; name: string; email: string };
  role: string;
  token: string;
}

const TOKEN_KEY = 'auth_token';
const ROLE_KEY = 'auth_role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data);
  }

  async saveSession(token: string, role: string): Promise<void> {
    await Preferences.set({ key: TOKEN_KEY, value: token });
    await Preferences.set({ key: ROLE_KEY, value: role });
  }

  async getToken(): Promise<string | null> {
    const result = await Preferences.get({ key: TOKEN_KEY });
    return result.value;
  }

  async getRole(): Promise<string | null> {
    const result = await Preferences.get({ key: ROLE_KEY });
    return result.value;
  }

  async clearSession(): Promise<void> {
    await Preferences.remove({ key: TOKEN_KEY });
    await Preferences.remove({ key: ROLE_KEY });
  }
}