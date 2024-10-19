import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UtilsLib } from '@/lib/utils';
import { icWalletUpcomingAsset } from '@/lib/constanst/assets';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  walletUpcommintAsset = icWalletUpcomingAsset;

  protected readonly utils = new UtilsLib();

  constructor(
    private router: Router,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {

  }

  goBack() {
    this.navCtrl.back()
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }


}
