import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EventItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  banner: string | null;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  capacity: number | null;
  status: string;
  category?: { id: number; name: string; slug: string };
  venue?: { id: number; name: string; city: string; address?: string } | null;
  organizer?: { id: number; name: string };
  ticket_types?: {
    id: number;
    name: string;
    description: string | null;
    price: number;
    available_quota: number;
    is_on_sale: boolean;
  }[];
}

export interface CreateEventPayload {
  event_category_id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  capacity?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

export interface UpdateEventPayload {
  event_category_id?: number;
  venue_id?: number | null;
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  capacity?: number;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMyEvents(): Observable<PaginatedResponse<EventItem>> {
    return this.http.get<PaginatedResponse<EventItem>>(
      `${this.baseUrl}/organizer/events`
    );
  }

  getMyEventDetail(id: number): Observable<{ data: EventItem }> {
    return this.http.get<{ data: EventItem }>(
      `${this.baseUrl}/organizer/events/${id}`
    );
  }

  getPublicEvents(): Observable<PaginatedResponse<EventItem>> {
    return this.http.get<PaginatedResponse<EventItem>>(`${this.baseUrl}/events`);
  }

  createEvent(payload: CreateEventPayload): Observable<{ data: EventItem }> {
    return this.http.post<{ data: EventItem }>(
      `${this.baseUrl}/organizer/events`,
      payload
    );
  }

  submitEvent(id: number): Observable<{ data: EventItem }> {
    return this.http.post<{ data: EventItem }>(
      `${this.baseUrl}/organizer/events/${id}/submit`,
      {}
    );
  }

  publishEvent(id: number): Observable<{ data: EventItem }> {
    return this.http.post<{ data: EventItem }>(
      `${this.baseUrl}/organizer/events/${id}/publish`,
      {}
    );
  }

  cancelEvent(id: number): Observable<{ data: EventItem }> {
    return this.http.post<{ data: EventItem }>(
      `${this.baseUrl}/organizer/events/${id}/cancel`,
      {}
    );
  }

  updateEvent(id: number, payload: UpdateEventPayload): Observable<{ data: EventItem }> {
    return this.http.put<{ data: EventItem }>(
      `${this.baseUrl}/organizer/events/${id}`,
      payload
    );
  }
  getPendingApprovals(): Observable<PaginatedResponse<EventItem>> {
    return this.http.get<PaginatedResponse<EventItem>>(
      `${this.baseUrl}/admin/events/pending`
    );
  }

  approveEvent(id: number): Observable<{ data: EventItem }> {
    return this.http.post<{ data: EventItem }>(
      `${this.baseUrl}/admin/events/${id}/approve`,
      {}
    );
  }

  getPublicDetail(id: number): Observable<{ data: EventItem }> {
    return this.http.get<{ data: EventItem }>(`${this.baseUrl}/events/${id}`);
  }
}