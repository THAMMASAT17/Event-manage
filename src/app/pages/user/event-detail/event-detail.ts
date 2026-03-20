import { Component, OnInit, NgZone } from '@angular/core'; // 1. นำเข้า NgZone
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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private ngZone: NgZone // 2. ฉีด NgZone เข้ามาใช้งาน
  ) {}

  ngOnInit(): void {
    // โค้ดสำหรับเช็คว่าหลุด Zone ไหม (ตามที่ AI แนะนำ)
    console.log('[DIAG] อยู่ในโซนของ Angular ไหม (ตอนเริ่ม)?:', NgZone.isInAngularZone());

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getEventById(id).subscribe({
        next: (res: any) => {
          
          // 3. บังคับให้การอัปเดตตัวแปร อยู่ใน "โซนการรับรู้" ของ Angular
          this.ngZone.run(() => {
            console.log('[DIAG] อยู่ในโซนไหม (ตอนรับข้อมูล)?:', NgZone.isInAngularZone());
            
            if (res && res.success) {
              this.event = res.data;
            } else {
              this.event = res; // เผื่อกรณีข้อมูลไม่หุ้ม success
            }
            this.isLoading = false; 
          });

        },
        error: (err: any) => {
          this.ngZone.run(() => {
            console.error('API Error:', err);
            this.isLoading = false;
          });
        }
      });
    } else {
      this.isLoading = false;
    }
  }
}