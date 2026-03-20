import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// 🛑 แก้ไขจุดที่ 1: ปรับ Path ถอยหลังแค่ 3 โฟลเดอร์ เพื่อกลับไปที่ src/app/services/api
import { ApiService } from '../../../services/api'; 

@Component({
  selector: 'app-seat-booking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './seat-booking.html'
})
export class SeatBooking implements OnInit {
  eventId: string | null = null;
  event: any = null;
  tickets: any[] = [];
  isLoading: boolean = true;
  isSubmitting: boolean = false; 
  
  totalPrice: number = 0;
  totalQty: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.fetchData(this.eventId);
    } else {
      this.isLoading = false;
    }
  }

  fetchData(id: string) {
    // 🛑 แก้ไขจุดที่ 2: เติม (res: any) เพื่อให้ TypeScript สบายใจ
    this.apiService.getEventById(id).subscribe((res: any) => {
      if (res && res.success) this.event = res.data;
    });

    this.apiService.getEventTickets(id).subscribe({
      next: (res: any) => {
        if (res && res.success && res.data) {
          this.tickets = res.data.map((t: any) => ({ ...t, selectedQty: 0 }));
        }
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  increaseQty(ticket: any) {
    const max = ticket.quantity || 10;
    if (ticket.selectedQty < max) {
      ticket.selectedQty++;
      this.calculateTotal();
    }
  }

  decreaseQty(ticket: any) {
    if (ticket.selectedQty > 0) {
      ticket.selectedQty--;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.totalPrice = this.tickets.reduce((sum, t) => sum + (t.price * t.selectedQty), 0);
    this.totalQty = this.tickets.reduce((sum, t) => sum + t.selectedQty, 0);
  }

  confirmBooking() {
    if (this.totalQty === 0) return;
    
    this.isSubmitting = true;
    const selectedTickets = this.tickets.filter(t => t.selectedQty > 0);
    
    const orderData = {
      event_id: this.eventId,
      total_price: this.totalPrice,
      total_qty: this.totalQty,
      tickets: selectedTickets
    };

    console.log('📦 กำลังส่งข้อมูลไปบันทึก:', orderData);

    setTimeout(() => {
      alert('🎉 จองตั๋วสำเร็จ! ระบบจะพาคุณไปยังหน้า "ตั๋วของฉัน"');
      this.isSubmitting = false;
      this.router.navigate(['/my-tickets']); 
    }, 1500);
  }
}