import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { NavController, Platform, AlertController } from '@ionic/angular';


import { ApiService } from '@/service/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = '';
  email: string = '';
  mobileNo = '';
  password: string = '';
  securePassword: boolean = true;
  alertMessageEmail: string = '';
  showErrorMessage: boolean = false;
  accountType: string = '';

  rifValue = '';

  identificationValue = '';

  constructor(
    private navCtrl: NavController,
    public platform: Platform,
    private router: Router,
    private alertController: AlertController,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen)
  }

  async presentAlert(message: string, type: 'success' | 'error' | 'casi' = 'error') {
    let header = 'Error';
    let cssClass = 'alert-error';

    const buttons: any[] = ['OK'];

    if (type === 'success') {
      header = 'Éxito';
      cssClass = 'alert-success';
    } else if (type === 'casi') {
      header = 'Ya casi lo tienes';
      cssClass = 'alert-success';
      buttons[0] = {
        text: 'OK',
        handler: () => {
          this.goTo('/auth/login');
        }
      };
    }

    const alert = await this.alertController.create({
      header,
      message,
      buttons,
      cssClass,
    });

    await alert.present();
  }


  validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.alertMessageEmail = '';
    if (this.email && !emailRegex.test(this.email)) {
      this.alertMessageEmail = 'Por favor ingresa un correo electrónico válido';
      return false
    }

    return this.apiService.getVerificEmailFalse({ email: this.email });
  }

  seleccionarTipoCuenta(event: any) {
    this.accountType = event.detail.value;
  }

  crearCuenta() {
    this.accountType = this.accountType || "PERSON";

    if (!this.name || !this.email || !this.mobileNo || !this.password || !this.accountType) {
      this.showErrorMessage = true;
      this.presentAlert('Por favor completa todos los campos');
      return;
    }

    this.showErrorMessage = false;

    const body = {
      fullname: this.name,
      email: this.email,
      phone: this.mobileNo,
      password: this.password,
      account: this.accountType,
      rif_text: this.rifValue,
      identification_text: this.identificationValue,
    };

    this.apiService.postUser(body).subscribe({
      next: (response) => {
        this.presentAlert('Active su usuario mediante el enlace enviado a su correo.', 'casi');
      },
      error: (err) => {}
    });
  }

}
