import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styles: [`
    .sidebar { width: 260px; min-height: 100vh; }
    .nav-link:hover { background-color: rgba(255,255,255,0.1); }
    .active-link { background-color: #E20613 !important; font-weight: bold; }
  `]
})
export class AdminLayout {}