import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEducationPageRoutingModule } from './edit-education-routing.module';

import { EditEducationPage } from './edit-education.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEducationPageRoutingModule
  ],
  declarations: [EditEducationPage]
})
export class EditEducationPageModule {}
