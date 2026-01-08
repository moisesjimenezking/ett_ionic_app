import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { NgOtpInputConfig } from 'ng-otp-input';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    NgOtpInputModule
  ]
})
export class VerificationPage implements OnInit {

  showLoadingDialog = false;
  otpValue = '0';
  config: NgOtpInputConfig = {
    length: 4,
    allowNumbersOnly: true,
    inputStyles: {
      'height': '50px',
      'width': '50px',
      'border-radius': '10px',
      'color': 'var(--blackColor)',
      'font-size':'18px',
      'font-weight':'600',
      'background': 'var(--extraLightGrayColor)',
      'border-width': '0',
    },
    inputClass: 'each_input',
    containerStyles: { 'display': 'flex', 'margin': '5px 10px' }
  }

  constructor(private navCtrl: NavController,private modalCtrl:ModalController, public platform: Platform, private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen)
  }

  onContinue() {
    this.showLoadingDialog = true
    setTimeout(() => {
      this.showLoadingDialog = false;
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/bottom-tab-bar/home')
    }, 2000);
  }

  onChange(event: any) {
    this.otpValue = event;
    if (event.length === 4) {
      this.showLoadingDialog = true
      setTimeout(() => {
        this.showLoadingDialog = false;
        this.modalCtrl.dismiss();
        this.router.navigateByUrl('/bottom-tab-bar/home')
      }, 2000);
    }
  }

}
