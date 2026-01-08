import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-success',
  templateUrl: './upload-success.page.html',
  styleUrls: ['./upload-success.page.scss'],
  standalone: true,             // ✅ importante
  imports: [IonicModule, CommonModule] // ✅ importa IonicModule para usar ion-header, ion-footer, etc.
})
export class UploadSuccessPage {

  constructor(private navCtrl: NavController, private router: Router) { }

  goBack() {
    this.navCtrl.back();
  }

  goTo(screen: string) {
    this.router.navigateByUrl(screen);
  }
}
