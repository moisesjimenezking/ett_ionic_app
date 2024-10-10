import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { NavController, Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
// import { BuildCircleIcon } from '@mui/icons-material/BuildCircle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  tap = 0;

  constructor(
    private platform: Platform,
    public location: Location,
    private navCtrl: NavController,
  ) {
    this.intializeApp();
    this.backButtonEvent();
  }

  get showSidebar() {
    return !this.location.path().endsWith('onboarding')
      && this.location.path().endsWith('login')
      && this.location.path().endsWith('register');
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this.location.isCurrentPathEqualTo('/bottom-tab-bar/home') ||
        this.location.isCurrentPathEqualTo('/bottom-tab-bar/saved') ||
        this.location.isCurrentPathEqualTo('/bottom-tab-bar/chats') ||
        this.location.isCurrentPathEqualTo('/bottom-tab-bar/profile') ||
        this.location.isCurrentPathEqualTo('/onboarding') ||
        this.location.isCurrentPathEqualTo('/auth/login')
      ) {
        this.tap++;
        if (this.tap == 2) {
          App.exitApp();
        }
        else {
          setTimeout(() => {
            this.tap = 0;
          }, 2000);
        }
      }
      else {
        this.navCtrl.back()
      }
    });
  }

  intializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setBackgroundColor({ color: 'transparent' });
    })
  }
}
