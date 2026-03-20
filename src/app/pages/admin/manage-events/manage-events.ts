import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🛑 ต้องนำเข้า FormsModule เพื่อใช้งาน ngModel (ดึงค่าจากฟอร์ม)
import { ApiService } from '../../../services/api'; // ถอย 3 โฟลเดอร์เป๊ะๆ!

@Component({
  selector: 'app-manage-events',
  standalone: true,
  imports: [CommonModule, FormsModule], // อย่าลืมใส่ FormsModule ตรงนี้
  templateUrl: './manage-events.html'
})
export class ManageEvents implements OnInit {
  events: any[] = [];
  isLoading: boolean = true;
  
  // ตัวแปรสำหรับสลับหน้าจอ
  showForm: boolean = false;
  isSaving: boolean = false;

  // ตัวแปรเก็บข้อมูลฟอร์ม
  formData = {
    event_name: '',
    description: '',
    event_date: '',
    organizer_id: 1 // กำหนดค่าเริ่มต้นเป็น 1 ไปก่อน
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.apiService.getEvents().subscribe({
      next: (res: any) => {
        if (res && res.success) this.events = res.data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  deleteEvent(id: number, name: string) {
    if (confirm(`⚠️ คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรม "${name}" ?`)) {
      this.apiService.deleteEvent(id).subscribe({
        next: (res: any) => {
          if (res && res.success) {
            this.events = this.events.filter(e => e.event_id !== id);
          }
        }
      });
    }
  }

  // เปิด-ปิด ฟอร์ม
  toggleForm() {
    this.showForm = !this.showForm;
    // ถ้าปิดฟอร์ม ให้ล้างค่าข้อมูลทิ้งด้วย
    if (!this.showForm) {
      this.formData = { event_name: '', description: '', event_date: '', organizer_id: 1 };
    }
  }

  // กดปุ่มบันทึกกิจกรรมใหม่
  saveEvent() {
    if (!this.formData.event_name || !this.formData.event_date) {
      alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    this.isSaving = true;
    this.apiService.addEvent(this.formData).subscribe({
      next: (res: any) => {
        if (res && res.success) {
          alert('✅ บันทึกกิจกรรมใหม่สำเร็จ!');
          this.loadEvents(); // โหลดตารางใหม่
          this.toggleForm(); // ปิดฟอร์มกลับไปหน้าตาราง
        }
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Save error:', err);
        alert('❌ เกิดข้อผิดพลาดในการบันทึก');
        this.isSaving = false;
      }
    });
  }
}