import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  events: any[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getEvents().subscribe({
      next: (res: any) => {
        // แกะกล่องเอาเฉพาะ data มาใช้อย่างสบายใจ
        if (res && res.success) {
          this.events = res.data; 
          console.log('✅ โหลดหน้า Home สำเร็จ:', this.events);
        }
        this.isLoading = false; // ปิด Loading เสมอ
      },
      error: (err: any) => {
        console.error('🚨 Error หน้า Home:', err);
        this.isLoading = false; // ปิด Loading เสมอ
      }
    });
  }
}