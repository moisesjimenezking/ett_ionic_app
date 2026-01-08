import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { EditContactPageRoutingModule } from './edit-contact-routing.module';
import { EditContactPage } from './edit-contact.page';
import { ApiService } from '../../service/api.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditContactPageRoutingModule,
    HttpClientModule,
    EditContactPage
  ],
  providers: [ApiService]
})
export class EditContactPageModule {}
