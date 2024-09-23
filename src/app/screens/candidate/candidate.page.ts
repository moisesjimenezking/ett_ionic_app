import { Component, OnInit, ViewChild } from '@angular/core';
import { IonMenu, IonModal } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.page.html',
  styleUrls: ['./candidate.page.scss'],
})
export class CandidatePage implements OnInit {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;

  userData = this.details();
  websitesList = this.userData.user.social_link;
  currentSkill = this.userData.user.skills;
  icon='';
  iconFront='';

  showMore = false;

  constructor(
    private navCtrl: NavController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userData = this.details();
    this.icon = this.stablishUrlPic(this.userData.user.icon);
    this.iconFront = this.stablishUrlPic(this.userData.user.icon_front);
  }

  details() {
    const storedItemString = localStorage.getItem('candidate');
    if (storedItemString) {
      return JSON.parse(storedItemString);
    }else{
      return {};
    }
  }

  goBack() {
    this.navCtrl.back()
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  stablishUrlPic (current: any){
    let iconItem = current; 
    let value = (iconItem === null || iconItem === '' || iconItem === 'null') ? `${localStorage.getItem('rute')}/img/iconHuman.jpg` : `${localStorage.getItem('rute')}/img/${iconItem}`;

    return value
  }

  logout() {
    this.closeMenu();
  }

  closeMenu() {
    if (this.menu) {
      this.menu.close();
    }
  }

}
