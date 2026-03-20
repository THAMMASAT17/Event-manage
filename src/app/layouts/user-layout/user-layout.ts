import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss'
})
// แก้ชื่อคลาสตรงนี้ จาก UserLayoutComponent เป็น UserLayout
export class UserLayout {}