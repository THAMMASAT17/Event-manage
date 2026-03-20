import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${id}`);
  }

  // ในไฟล์ services/api.ts (เพิ่มฟังก์ชันนี้เข้าไป)
  getEventTickets(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${eventId}/tickets`);
  }
}