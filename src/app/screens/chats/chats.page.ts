import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, IonModal, NavController } from '@ionic/angular';

import { ApiService } from '../../service/api.service';
import { ChatMessage } from 'src/app/types/chat-messages';
import { UtilsLib } from '@/lib/utils';


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
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
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

  onMessageSelected(message: ChatMessage) {
    this.goToDetails('/message', message);
    // this.conversation = message;
  }


  stablishUrlPic(url: string) {
    return this.utils.stablishUrlPic(url);
  }


  searchIcon(item: any): string {
    let newIcon = this.stablishUrlPic(item)
    return newIcon;
  }
}
