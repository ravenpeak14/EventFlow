import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EventCategoryItem {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class EventCategoryService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: EventCategoryItem[] }> {
    return this.http.get<{ data: EventCategoryItem[] }>(
      `${this.baseUrl}/event-categories`
    );
  }
}