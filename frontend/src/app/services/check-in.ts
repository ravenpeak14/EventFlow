import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CheckInResult {
  message: string;
  data: {
    ticket_code: string;
    attendee_name: string;
    ticket_type: string;
    checked_in_at: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CheckInService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  checkIn(eventId: number, ticketCode: string): Observable<CheckInResult> {
    return this.http.post<CheckInResult>(
      `${this.baseUrl}/staff/events/${eventId}/check-in`,
      { ticket_code: ticketCode }
    );
  }
}