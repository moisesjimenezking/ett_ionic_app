import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, IonModal, NavController } from '@ionic/angular';

import { ApiService } from '../../service/api.service';
import { ChatMessage } from 'src/app/types/chat-messages';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;
  @ViewChild('logoutDialogChat', { read: IonModal }) logoutDialog!: IonModal;

  chatsList: ChatMessage[] = [
  ];
  isLoadingChatList = false;
  // conversation: Message | null = null;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private apiChat: ApiService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.allChats();
  }

  ionViewWillEnter() {
    this.allChats();
  }

  goToDetails(screen: any, item: any) {
    this.router.navigateByUrl(screen);
    localStorage.setItem('messages', JSON.stringify(item));
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  goBack() {
    this.navCtrl.back()
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

  closeMenu() {
    if (this.menu) {
      this.menu.close();
    }
  }

  logout() {
    this.closeMenu();
  }

  stablishUrlPic(current: any) {
    let iconItem = current;
    let value = (iconItem === null || iconItem === '' || iconItem === 'null') ? `${localStorage.getItem('rute')}/img/iconHuman.jpg` : `${localStorage.getItem('rute')}/img/${iconItem}`;

    return value
  }

  searchIcon(item: any): string {
    let newIcon = this.stablishUrlPic(item)
    return newIcon;
  }
}
