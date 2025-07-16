import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, IonModal, NavController } from '@ionic/angular';

import { ApiService } from '../../service/api.service';
import { ChatMessage } from 'src/app/types/chat-messages';
import { UtilsLib } from '@/lib/utils';
import { SocketService } from '../../service/socket.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  @ViewChild('logoutDialogChat', { read: IonModal }) logoutDialog!: IonModal;


  protected readonly utils = new UtilsLib();

  chatsList: ChatMessage[] = [
  ];
  isLoadingChatList = false;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private apiChat: ApiService,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.socketService.listen('newMessage', (data: { datetime_update: any; view: number; isSender: boolean; id: number; chats_id: number; message: string; user_id: number; datetime: string; }) => {
      this.updateChat(data);
    });
  }


  ionViewWillEnter() {
    this.allChats();
  }

  goToDetails(screen: string, item: ChatMessage) {
    localStorage.setItem('messages', JSON.stringify(item));
    this.router.navigateByUrl(screen);
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  goBack() {
    this.navCtrl.navigateRoot('')
  }

  allChats() {
    this.isLoadingChatList = true;
    setTimeout(() => {
      this.apiChat.getChat({}).subscribe({
        next: (data: any) => {
          this.chatsList = data;
          this.isLoadingChatList = false;
          this.cdr.detectChanges();
        },
        error: (_) => {
          this.isLoadingChatList = false;
        }
      });
    }, 100);
  }

  updateChat(data: { datetime_update: any; view: number; isSender: boolean; id: number; chats_id: number; message: string; user_id: number; datetime: string; }) {
    let chatIndex = this.chatsList.findIndex(chat => chat.id === data.chats_id);

    if (chatIndex !== -1) {
      this.chatsList[chatIndex].lastMsg = data.message;
      if (!this.chatsList[chatIndex].messages) {
        this.chatsList[chatIndex].messages = []; 
      }

      const user_id = localStorage.getItem('user_id')

      if (user_id !== null && user_id !== "" && parseInt(user_id) === data.user_id) {
        data.isSender = true;
      }else{
        data.isSender = false;
      }

      this.chatsList[chatIndex].messages.push(data);
      this.chatsList[chatIndex].datetime_update = new Date().toISOString();
      this.chatsList[chatIndex].unreadMsgCount += 1
      this.cdr.detectChanges();
    } else {
      console.log(`⚠️ Chat ${data.chats_id} no encontrado en la lista.`);
    }
  }

  onMessageSelected(message: ChatMessage) {
    console.log(message)
    this.goToDetails('/message', message);
  }


  stablishUrlPic(url: string) {
    return this.utils.stablishUrlPic(url);
  }


  searchIcon(item: any): string {
    let newIcon = this.stablishUrlPic(item)
    return newIcon;
  }
}
