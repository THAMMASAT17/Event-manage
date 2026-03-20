import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html'
})
export class Home implements OnInit {
  events: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getEvents().subscribe({
      next: (res: any) => {
        // 🛡️ หัวใจสำคัญ: แกะเฉพาะ Array ออกมา
        if (res && res.data && Array.isArray(res.data)) {
          this.events = res.data;
          console.log('✅ [Home] ข้อมูลเข้าสู่ตัวแปรแล้ว:', this.events);
        }
      },
      error: (err) => console.error('🚨 [Home] API Error:', err)
    });
  }
}