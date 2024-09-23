import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadSuccessPageRoutingModule } from './upload-success-routing.module';

import { UploadSuccessPage } from './upload-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadSuccessPageRoutingModule
  ],
  declarations: [UploadSuccessPage]
})
export class UploadSuccessPageModule {}
