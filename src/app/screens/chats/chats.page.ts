import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { IonMenu, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;
  @ViewChild('logoutDialogChat', { read: IonModal }) logoutDialog!: IonModal;

  chatsList: any[] = [];

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

  allChats(){
    setTimeout(() => {
      this.apiChat.getChat({}).subscribe((data: any) => {
        this.chatsList = data;
        this.cdr.detectChanges();
      });
    }, 100);     
  }

  closeMenu() {
    if (this.menu) {
      this.menu.close();
    }
  }

  logout() {
    this.closeMenu();
  }

  stablishUrlPic (current: any){
    let iconItem = current; 
    let value = (iconItem === null || iconItem === '' || iconItem === 'null') ? `${localStorage.getItem('rute')}/img/iconHuman.jpg` : `${localStorage.getItem('rute')}/img/${iconItem}`;

    return value
  }

  searchIcon(item: any): string{
    let newIcon = this.stablishUrlPic(item)
    return newIcon;
  }
}
