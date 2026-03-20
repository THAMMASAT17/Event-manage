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
  // โซนของ User
  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', component: Home },
      { path: 'event/:id', component: EventDetail },
      { path: 'booking/:id', component: SeatBooking },
      { path: 'my-tickets', component: MyTickets }
    ]
  },

  // โซนของ Admin
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'events', component: ManageEvents },
      { path: 'venues', component: ManageVenues },
      { path: 'tickets', component: ManageTickets },
      { path: 'organizers', component: ManageOrganizers }
    ]
  },

  // ถ้าพิมพ์ URL มั่ว ให้เด้งกลับไปหน้าแรก
  { path: '**', redirectTo: '' }
];