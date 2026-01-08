import { icPersonAsset, icSupportAsset } from '@/lib/constanst/assets';
import { UtilsLib } from '@/lib/utils';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatMessage } from 'src/app/types/chat-messages';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImgComponent } from '@/components/img/img.component';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ImgComponent
  ]
})
export class ChatMessagesComponent implements OnInit {
  @Input() messages: ChatMessage[] = [];
  @Input() isLoading = false;
  @Output() onMessageSelected = new EventEmitter<ChatMessage>();

  icSupportAsset = icSupportAsset;

  protected readonly utils = new UtilsLib();

  constructor() { }

  ngOnInit() { }

  stablishUrlPic(url: string | null) {
    return this.utils.stablishUrlPic(url);
  }


}
