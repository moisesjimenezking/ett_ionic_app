import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, IonModal } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SidebarComponent implements OnInit {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;
  @ViewChild('logoutDialog', { read: IonModal }) logoutDialog!: IonModal;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() { }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  closeMenu() {
    this.menu.close();
  }

  tyc() {
    this.closeMenu();
    this.goTo('/terms-and-conditions');
  }

  logout() {
    localStorage.clear();
    this.logoutDialog.dismiss();
    this.closeMenu();
    this.goTo('/auth/login');

  }
}
