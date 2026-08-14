import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface VenueItem {
  id: number;
  name: string;
  address: string;
  city: string;
  map_url: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface CreateVenuePayload {
  name: string;
  address: string;
  city: string;
  map_url?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(search?: string): Observable<PaginatedResponse<VenueItem>> {
    const url = search
      ? `${this.baseUrl}/venues?search=${encodeURIComponent(search)}`
      : `${this.baseUrl}/venues`;
    return this.http.get<PaginatedResponse<VenueItem>>(url);
  }

  create(payload: CreateVenuePayload): Observable<{ data: VenueItem }> {
    return this.http.post<{ data: VenueItem }>(`${this.baseUrl}/venues`, payload);
  }
}