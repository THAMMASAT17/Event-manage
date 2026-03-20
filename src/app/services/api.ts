import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // ชี้ URL ไปที่ Backend ของเรา
  private baseUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  // ==========================================
  // 🎯 ฟังก์ชันเรียก API ไปที่ Backend
  // ทุกฟังก์ชันจะได้รับข้อมูลกลับมาเป็น { success: true, data: ... }
  // ==========================================

  // 1. ดึงข้อมูลอีเวนต์ "ทั้งหมด" (ใช้สำหรับหน้า Home)
  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events`);
  }

  // 2. ดึงข้อมูลอีเวนต์ "1 งาน" ตาม ID (ใช้สำหรับหน้า Event Detail)
  getEventById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${id}`);
  }

  // 3. ดึง "ประเภทตั๋วและราคา" ของอีเวนต์นั้นๆ (เตรียมไว้สำหรับหน้า Booking)
  getEventTickets(eventId: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${eventId}/tickets`);
  }

  // ใน src/app/services/api.ts (เพิ่มต่อจากฟังก์ชันเดิมที่มีอยู่)
  
  // ลบข้อมูลกิจกรรม
  deleteEvent(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/events/${id}`);
  }

  // ใน src/app/services/api.ts (ต่อจาก deleteEvent)
  
  // เพิ่มกิจกรรมใหม่
  addEvent(eventData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/events`, eventData);
  }

  // จัดการสถานที่
  getVenues(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/venues`);
  }
  addVenue(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/venues`, data);
  }
  deleteVenue(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/venues/${id}`);
  }

  // จัดการตั๋ว (Admin)
  getAllTicketsAdmin(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/tickets`);
  }
  addTicket(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tickets`, data);
  }
  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/tickets/${id}`);
  }
}