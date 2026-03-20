import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-detail.html'
})
export class EventDetail implements OnInit {
  event: any = null;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getEventById(id).subscribe({
        next: (res: any) => {
          // 🛡️ แกะ Object ออกมาจาก data
          this.event = res?.data || null;
          this.isLoading = false;
          console.log('✅ [Detail] ข้อมูลอีเวนต์:', this.event);
        },
        error: (err) => {
          console.error('🚨 [Detail] API Error:', err);
          this.isLoading = false;
        }
      });
    }
  }
}