import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TicketTypeItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  quota: number;
  sold_count: number;
  available_quota: number;
  sale_starts_at: string | null;
  sale_ends_at: string | null;
  is_active: boolean;
  is_on_sale: boolean;
}

export interface TicketTypePayload {
  name: string;
  description?: string;
  price: number;
  quota: number;
  sale_starts_at?: string;
  sale_ends_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketTypeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getByEvent(eventId: number): Observable<{ data: TicketTypeItem[] }> {
    return this.http.get<{ data: TicketTypeItem[] }>(
      `${this.baseUrl}/organizer/events/${eventId}/ticket-types`
    );
  }

  create(
    eventId: number,
    payload: TicketTypePayload
  ): Observable<{ data: TicketTypeItem }> {
    return this.http.post<{ data: TicketTypeItem }>(
      `${this.baseUrl}/organizer/events/${eventId}/ticket-types`,
      payload
    );
  }

  delete(eventId: number, ticketTypeId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/organizer/events/${eventId}/ticket-types/${ticketTypeId}`
    );
  }
}