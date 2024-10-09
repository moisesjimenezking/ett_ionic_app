import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service';

import { ChatsPageRoutingModule } from './chats-routing.module';
import { ChatsPage } from './chats.page';

// COMPONENTS //
import { ChatEmptyStateComponent } from './chat-empty-state/chat-empty-state.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [ChatsPage, ChatEmptyStateComponent, ChatMessagesComponent],
  providers: [ApiService]
})
export class ChatsPageModule { }
