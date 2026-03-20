import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; // 1. นำเข้าจาก @angular/core
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // 🛑 2. บรรทัดนี้คือ "สวิตช์" เปิดใช้งาน Zone.js ครับ! (เช็คว่ามีไหม หรือโดนคอมเมนต์ไว้ไหม)
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    provideRouter(routes),
    provideHttpClient()
  ]
};