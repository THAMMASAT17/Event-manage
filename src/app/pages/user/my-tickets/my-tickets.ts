import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-tickets.html'
})
export class MyTickets implements OnInit {
  // สมมติข้อมูลตั๋วที่จองสำเร็จมาโชว์ (ในอนาคตดึงจาก API ได้เลย)
  myBookings = [
    {
      order_id: 'TXN-998877',
      event_name: 'คอนเสิร์ตใหญ่ปลายปี 2024',
      date: new Date('2024-12-25'),
      ticket_type: 'VIP Seat',
      qty: 2,
      status: 'Confirmed'
    }
  ];

  constructor() {}
  ngOnInit(): void {}
}