import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@/shared/shared.module';
import { UtilsLib } from '@/lib/utils';
import { icWalletUpcomingAsset } from '@/lib/constanst/assets';
import { ApiService } from '@/service/api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ApiService]
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
