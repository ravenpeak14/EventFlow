import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OrderItemPayload {
  ticket_type_id: number;
  quantity: number;
}

export interface OrderItemResult {
  id: number;
  ticket_type: { id: number; name: string };
  quantity: number;
  price_at_purchase: number;
  subtotal: number;
}

export interface OrderResult {
  id: number;
  order_number: string;
  total_amount: number;
  status: string;
  items: OrderItemResult[];
  created_at: string;
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
export class OrderService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(eventId: number, items: OrderItemPayload[]): Observable<{ data: OrderResult }> {
    return this.http.post<{ data: OrderResult }>(
      `${this.baseUrl}/events/${eventId}/orders`,
      { items }
    );
  }

  getMyOrders(): Observable<PaginatedResponse<OrderResult>> {
    return this.http.get<PaginatedResponse<OrderResult>>(`${this.baseUrl}/orders`);
  }

  getDetail(id: number): Observable<{ data: OrderResult }> {
    return this.http.get<{ data: OrderResult }>(`${this.baseUrl}/orders/${id}`);
  }

  pay(id: number): Observable<{ data: OrderResult }> {
    return this.http.post<{ data: OrderResult }>(`${this.baseUrl}/orders/${id}/pay`, {});
  }
}