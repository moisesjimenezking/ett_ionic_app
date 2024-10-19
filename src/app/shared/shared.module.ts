// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ImgComponent } from '@/components/img/img.component';
import { FileItemLoaderComponent } from '@/components/file-item-loader/file-item-loader.component';

@NgModule({
  declarations: [SidebarComponent, ImgComponent, FileItemLoaderComponent],
  imports: [
    CommonModule,
    IonicModule,

  ],
  exports: [SidebarComponent, ImgComponent, FileItemLoaderComponent]
})
export class SharedModule { }
