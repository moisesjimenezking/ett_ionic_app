import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FileItemLoaderComponent } from '@/components/file-item-loader/file-item-loader.component';
import { SidebarComponent } from '@/components/sidebar/sidebar.component';
import { ImgComponent } from '@/components/img/img.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SidebarComponent,
    ImgComponent,
    FileItemLoaderComponent
  ],
  exports: [
    SidebarComponent,
    ImgComponent,
    FileItemLoaderComponent
  ]
})
export class SharedModule { }
