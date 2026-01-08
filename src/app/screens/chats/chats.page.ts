import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, IonModal, NavController } from '@ionic/angular';

import { ApiService } from '../../service/api.service';
import { ChatMessage } from 'src/app/types/chat-messages';
import { UtilsLib } from '@/lib/utils';
import { SocketService } from '../../service/socket.service';

import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatEmptyStateComponent } from './chat-empty-state/chat-empty-state.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { SharedModule } from "../../shared/shared.module";


@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatEmptyStateComponent,
    ChatMessagesComponent,
    SharedModule
  ]
  
})
export class ChatsPage implements OnInit {
  @ViewChild('logoutDialogChat', { read: IonModal }) logoutDialog!: IonModal;
  @ViewChild('sendMessageModal') sendMessageModal!: IonModal;


  protected readonly utils = new UtilsLib();

  phoneNumber: string = '';
  userExists: boolean | null = null;
  isSubmitting = false;
  userName: string = '';
  private debounceTimer: any;
  userReceptId: string = '';
  chatsList: ChatMessage[] = [
  ];
  isLoadingChatList = false;
  chatId: string = '';

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
          // this.chatsList = data;
          this.chatsList = data.map((chat: ChatMessage) => this.adjustMessageTime(chat));
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
    let chatIndex = this.chatsList.findIndex(chat => chat.id === data.chats_id || chat.id === Number(this.chatId));

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
      this.allChats();
    } else {
      this.allChats();
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

  onPhoneInput(event: any) {
    const value = event.target.value;
    this.phoneNumber = value;

    // Cancela cualquier timer anterior
    clearTimeout(this.debounceTimer);

    // Espera 1.5 segundos antes de validar
    this.debounceTimer = setTimeout(() => {
      if (this.phoneNumber.trim().length > 5) {
        this.validateUser(this.phoneNumber.trim());
      } else {
        this.userExists = null;
        this.userName = '';
      }
    }, 1500);
  }

  // Simulación de la solicitud a la API
  validateUser(phone: string) {
    this.isSubmitting = true;

    this.apiChat.getUserByPhone(phone).subscribe({
      next: (response: any) => {
        if (response?.data?.length > 0) {
          this.userExists = true;
          this.userName = response.data[0].fullname;
          this.userReceptId = response.data[0].id;
        } else {
          this.userExists = false;
          this.userName = '';
          this.userReceptId = '';
        }
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error API:', err);
        this.userExists = false;
        this.userName = '';
        this.isSubmitting = false;
        this.userReceptId = '';
        this.cdr.detectChanges();
      },
    });
  }

  goToChat() {
    if (!this.userExists) return;

    localStorage.removeItem('messages');

    const body = {
      "user_sending_id": localStorage.getItem('user_id'),
      "user_recept_id": this.userReceptId
    };

    this.apiChat.postChats(body)
      .pipe(
        catchError((error: any) => {
          this.isSubmitting = false;
          console.error('Error al crear el chat:', error);
          return throwError(() => error);
        }),
        tap((data: any) => {
          this.chatId = data.id;
          this.isSubmitting = false;

          // 🔥 AQUÍ ya tienes la referencia real del modal
          this.sendMessageModal.dismiss();

          this.allChats();
          this.router.navigateByUrl(
            `/message?chatId=${this.chatId}&name=${this.userName}`
          );
        })
      )
      .subscribe();
  }

  adjustMessageTime(msg: ChatMessage): ChatMessage {
    const dt = msg.datetime_update || msg.datetime;
    if (!dt) return msg;

    const dateUTC = new Date(dt);
    const localTime = dateUTC.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return { ...msg, lastMsgTime: localTime };
  }
}
