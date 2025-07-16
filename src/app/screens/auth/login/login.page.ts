import { assetsPath, ettLogoAsset, smallBusinessAsset } from '@/lib/constanst/assets';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { IonRouterOutlet, Platform, AlertController, IonModal } from '@ionic/angular';
import { ApiService } from '@/service/api.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('dialogPass', { read: IonModal }) dialogPass!: IonModal;
  @ViewChild('dialogCode', { read: IonModal }) dialogCode!: IonModal;

  iconLogin = `${assetsPath}/images/ett-logo.png`;
  email: string = '';
  emailRecover: string = '';
  password: string = '';
  securePassword: boolean = true;
  alertMessageEmail: string = '';
  alertMessageCode: string = '';
  code: string = '';
  isModalOpen = false;

  passwd: string = '';
  confirm_password: string = '';

  constructor(
    private routerOutlet: IonRouterOutlet,
    public platform: Platform,
    private router: Router,
    private alertController: AlertController,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getData()
  }

  ionViewWillEnter() {
    this.email = '';
    this.emailRecover = '';
    this.password = '';
    this.passwd = '';
    this.confirm_password = '';
    this.securePassword = true;
  }

  ionViewDidEnter() {
    this.routerOutlet.swipeGesture = false;
  }

  ionViewWillLeave() {
    this.routerOutlet.swipeGesture = true;
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen)
  }

  async presentAlert(message: string, type: 'error' | 'success' = 'error') {
    const alert = await this.alertController.create({
      header: type === 'success' ? 'Éxito' : 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  showEmailModal() {
    this.isModalOpen = true;
  }

  submitEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.alertMessageEmail = '';
    const email = this.emailRecover;
    console.log(email);
    if (email && !emailRegex.test(email)) {
      this.alertMessageEmail = 'Por favor ingresa un correo electrónico válido';
      this.presentAlert(this.alertMessageEmail);
      return throwError(() => new Error(this.alertMessageEmail));
    }

    this.apiService.getRecoverPassEmail({ email: email }).subscribe({
    next: (response) => {
        if (response?.result === 201) {
          this.dialogPass.dismiss()
          this.dialogCode.present();
        } else {
          this.presentAlert('No se pudo enviar el correo.');
        }
      },
      error: (error) => {
        console.error('Error en recuperación de contraseña:', error.message);
      }
    });
    return;
  }

  onDismissDialogPass() {
    this.dialogPass.dismiss();
    this.emailRecover = '';
  }

  isDialogOpen(modal: IonModal) {
    return modal.isOpen || modal.isCmpOpen;
  }

  validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.alertMessageEmail = '';
    const email = this.isDialogOpen(this.dialogPass) ? this.emailRecover : this.email;

    if (email && !emailRegex.test(email)) {
      this.alertMessageEmail = 'Por favor ingresa un correo electrónico válido';
      return false
    }

    return this.apiService.getVerificEmail({ email });
  }

  changePassword(): void {
    let errorAlert = false;
    let errorMessage = '';

    if (!this.passwd || !this.confirm_password) {
      errorAlert = true;
      errorMessage = 'Por favor, introduzca su nueva contraseña para continuar.';
    }

    if (this.passwd !== this.confirm_password) {
      errorAlert = true;
      errorMessage = 'Las contraseñas ingresadas no coinciden. Por favor, verifíquelas.';
    }

    if (errorAlert) {
      this.presentAlert(errorMessage);
      return;
    }

    const body = {
      code: this.code,
      passwd: this.passwd,
      confirm_password: this.confirm_password
    };

    this.apiService.changePass(body).subscribe({
      next: (response) => {
        if (response.status === 201) {
          this.presentAlert('Contraseña cambiada exitosamente.', 'success');
          this.dialogCode.dismiss();

          this.emailRecover = '';
          this.code = '';
          this.passwd = '';
          this.confirm_password = '';
        } else {
          this.presentAlert('No se pudo cambiar la contraseña.');
        }
      },
      error: (err) => {
        console.error('Error en el cambio de contraseña:', err.message);
        // Nota: el error ya se maneja también dentro de catchError del servicio
      }
    });
  }


  validateCode() {
    const codeRegex = /^\d{6}$/;
    this.alertMessageCode = '';

    const code = this.code;

    if (!codeRegex.test(code)) {
      this.alertMessageCode = 'El código debe contener exactamente 6 dígitos numéricos';
      return false;
    }

    return this.apiService.getVerificCode({ code });
  }

  token() {
    if (!this.email || !this.password) {
      let errorMessage = 'Credenciales incorrectas';
      this.presentAlert(errorMessage);
      return throwError(() => new Error(errorMessage));
    }

    const body = {
      username: this.email,
      password: this.password
    };

    return this.apiService.postToken(body)
  }

  openDialogCode() {
    this.dialogPass.dismiss(); // Cierra el primer modal
    this.dialogCode.present(); // Abre el segundo modal
  }
}
