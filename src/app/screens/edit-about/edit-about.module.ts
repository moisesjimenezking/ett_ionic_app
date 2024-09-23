import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { EditAboutPageRoutingModule } from './edit-about-routing.module';

import { EditAboutPage } from './edit-about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAboutPageRoutingModule,
    HttpClientModule
  ],
  declarations: [EditAboutPage],
  providers: [ApiService]
})
export class EditAboutPageModule {}
