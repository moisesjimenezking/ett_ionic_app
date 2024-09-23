import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { ChatsPageRoutingModule } from './chats-routing.module';
import { ChatsPage } from './chats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ChatsPage],
  providers: [ApiService]
})
export class ChatsPageModule {}
