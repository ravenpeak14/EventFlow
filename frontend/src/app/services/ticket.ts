import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TicketItem {
  id: number;
  ticket_code: string;
  status: string;
  checked_in_at: string | null;
  ticket_type: { name: string };
  event: {
    id: number;
    name: string;
    start_date: string;
    start_time: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMyTickets(): Observable<{ data: TicketItem[] }> {
    return this.http.get<{ data: TicketItem[] }>(`${this.baseUrl}/tickets`);
  }
}