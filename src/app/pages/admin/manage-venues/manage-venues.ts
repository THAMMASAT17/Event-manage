import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api'; // ถอย 3 ชั้นเป๊ะ!

@Component({
  selector: 'app-manage-venues',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-venues.html'
})
export class ManageVenues implements OnInit {
  venues: any[] = [];
  isLoading: boolean = true;
  showForm: boolean = false;
  
  formData = { venue_name: '', address: '', city: '', capacity: 0 };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadVenues();
  }

  loadVenues() {
    this.isLoading = true;
    this.apiService.getVenues().subscribe({
      next: (res: any) => {
        if (res.success) this.venues = res.data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  saveVenue() {
    if (!this.formData.venue_name) return alert('กรุณาระบุชื่อสถานที่');
    this.apiService.addVenue(this.formData).subscribe(res => {
      if (res.success) {
        alert('บันทึกสำเร็จ');
        this.loadVenues();
        this.showForm = false;
        this.formData = { venue_name: '', address: '', city: '', capacity: 0 };
      }
    });
  }

  deleteVenue(id: number) {
    if (confirm('ยืนยันการลบสถานที่นี้?')) {
      this.apiService.deleteVenue(id).subscribe(res => {
        if (res.success) this.venues = this.venues.filter(v => v.venue_id !== id);
      });
    }
  }
}