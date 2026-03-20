import { Routes } from '@angular/router';

// Layouts
import { UserLayout } from './layouts/user-layout/user-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

// User Pages
import { Home } from './pages/user/home/home';
import { EventDetail } from './pages/user/event-detail/event-detail';
import { SeatBooking } from './pages/user/seat-booking/seat-booking';
import { MyTickets } from './pages/user/my-tickets/my-tickets';

// Admin Pages
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { ManageEvents } from './pages/admin/manage-events/manage-events';
import { ManageVenues } from './pages/admin/manage-venues/manage-venues';
import { ManageTickets } from './pages/admin/manage-tickets/manage-tickets';
import { ManageOrganizers } from './pages/admin/manage-organizers/manage-organizers';

export const routes: Routes = [
  // ==========================================
  // 🟢 โซนของ User
  // ==========================================
  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', component: Home, title: 'หน้าแรก | ระบบจองตั๋ว' },
      { path: 'event/:id', component: EventDetail, title: 'รายละเอียดกิจกรรม' },
      { path: 'booking/:id', component: SeatBooking, title: 'จองตั๋วเข้าชม' },
      { path: 'my-tickets', component: MyTickets, title: 'ตั๋วของฉัน' }
    ]
  },

  // ==========================================
  // 🔴 โซนของ Admin
  // ==========================================
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      // เปลี่ยนตรงนี้นิดหน่อย: ให้ redirect ไปที่ dashboard แทนการใช้ path ว่างตรงๆ
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: Dashboard, title: 'Admin | ภาพรวมระบบ' },
      { path: 'events', component: ManageEvents, title: 'Admin | จัดการกิจกรรม' },
      { path: 'venues', component: ManageVenues, title: 'Admin | จัดการสถานที่' },
      { path: 'tickets', component: ManageTickets, title: 'Admin | จัดการตั๋ว' },
      { path: 'organizers', component: ManageOrganizers, title: 'Admin | จัดการผู้จัดงาน' }
    ]
  },

  // ==========================================
  // ⛔ ถ้าพิมพ์ URL มั่ว ให้เด้งกลับไปหน้าแรก
  // ==========================================
  { path: '**', redirectTo: '' }
];