// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ImgComponent } from '@/components/img/img.component';

@NgModule({
  declarations: [SidebarComponent, ImgComponent],
  imports: [
    CommonModule,
    IonicModule,

  ],
  exports: [SidebarComponent, ImgComponent]
})
export class SharedModule { }
