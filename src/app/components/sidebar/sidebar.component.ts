import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  implements OnInit {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;
  @ViewChild('logoutDialog', { read: IonModal }) logoutDialog!: IonModal;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  closeMenu() {
    this.menu.close();
  }

  logout() {
    this.closeMenu();
  }
}
