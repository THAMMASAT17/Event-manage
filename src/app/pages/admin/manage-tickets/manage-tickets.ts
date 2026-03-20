import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api'; // ถอย 3 ชั้น

@Component({
  selector: 'app-manage-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-tickets.html'
})
export class ManageTickets implements OnInit {
  tickets: any[] = [];
  events: any[] = []; // เก็บรายชื่ออีเวนต์เอาไว้ให้เลือกในฟอร์ม
  isLoading: boolean = true;
  showForm: boolean = false;

  formData = { event_id: '', ticket_type: '', price: 0, quantity: 0 };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    // ดึงทั้งรายชื่อตั๋วและรายชื่ออีเวนต์
    this.apiService.getAllTicketsAdmin().subscribe(res => {
      if (res.success) this.tickets = res.data;
      this.isLoading = false;
    });

    this.apiService.getEvents().subscribe(res => {
      if (res.success) this.events = res.data;
    });
  }

  saveTicket() {
    if (!this.formData.event_id || !this.formData.ticket_type) {
      return alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
    this.apiService.addTicket(this.formData).subscribe(res => {
      if (res.success) {
        alert('เพิ่มตั๋วสำเร็จ!');
        this.loadData();
        this.showForm = false;
        this.formData = { event_id: '', ticket_type: '', price: 0, quantity: 0 };
      }
    });
  }

  deleteTicket(id: number) {
    if (confirm('ลบตั๋วใบนี้ใช่ไหม?')) {
      this.apiService.deleteTicket(id).subscribe(res => {
        if (res.success) this.tickets = this.tickets.filter(t => t.ticket_id !== id);
      });
    }
  }
}