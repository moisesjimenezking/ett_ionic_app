import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../service/chat.service';


@Component({
  selector: 'app-bottom-tab-bar',
  templateUrl: './bottom-tab-bar.page.html',
  styleUrls: ['./bottom-tab-bar.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class BottomTabBarPage implements OnInit {

  hasUnread$ = this.chatService.hasUnreadMessages$;

  constructor(
    private cdr: ChangeDetectorRef,
    private routerOutlet: IonRouterOutlet,
    private platform: Platform,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ionViewWillEnter() {
    this.cdr.detectChanges();
  }

  // ionViewDidEnter() {
  //   this.routerOutlet.swipeGesture = false;
  // }

  // ionViewWillLeave() {
  //   this.routerOutlet.swipeGesture = true;
  // }


}
