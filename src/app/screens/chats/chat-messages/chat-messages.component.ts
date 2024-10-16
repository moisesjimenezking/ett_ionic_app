import { icPersonAsset } from '@/lib/constanst/assets';
import { UtilsLib } from '@/lib/utils';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatMessage } from 'src/app/types/chat-messages';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent implements OnInit {
  @Input() messages: ChatMessage[] = [];
  @Input() isLoading = false;
  @Output() onMessageSelected = new EventEmitter<ChatMessage>();

  iconHumanAsset = icPersonAsset;

  protected readonly utils = new UtilsLib();

  constructor() { }

  ngOnInit() { }

  stablishUrlPic(url: string | null) {
    return this.utils.stablishUrlPic(url);
  }


}
