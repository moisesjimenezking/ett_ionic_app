import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { NavController } from '@ionic/angular';
import { IonMenu, IonModal } from '@ionic/angular';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;

  fullName = localStorage.getItem('fullname')
  icon = this.stablishUrlPic(localStorage.getItem('icon_profile'));
  accountType = localStorage.getItem('accountType') === "COMPANY" ? true : false;

  walletId: string = '';
  balanceAvailable: string = '';
  balanceLocked: string = '';
  walletCode: string = '';
  listTransaction: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiWallet: ApiService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.apiWallet.getWallet().subscribe((data: any) => {
      this.walletId         = data.id;
      this.balanceAvailable = data.balance;
      this.balanceLocked    = data.balance_locked;
      this.walletCode       = data.account_code;
    });
  }

  stablishUrlPic (current: any){
    let iconItem = current; 
    let value = (iconItem === null || iconItem === '' || iconItem === 'null') ? `${localStorage.getItem('rute')}/img/iconHuman.jpg` : `${localStorage.getItem('rute')}/img/${iconItem}`;

    return value
  }

  goBack() {
    this.navCtrl.back()
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  closeMenu() {
    if (this.menu) {
      this.menu.close();
    }
  }

  logout() {
    this.closeMenu();
  }

}
