import { assetsPath } from '@/lib/constanst/assets';
import { Component, OnInit, ViewChild, ViewEncapsulation, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { IonRouterOutlet, Platform, AlertController, IonModal, LoadingController } from '@ionic/angular';
import { ApiService } from '@/service/api.service';
import { Observable, lastValueFrom } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [IonicModule, CommonModule, NgOtpInputModule, FormsModule]
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
    private apiService: ApiService,
    private loadingController: LoadingController,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.apiService.getData();
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

  async submitEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.alertMessageEmail = '';
    const email = this.emailRecover;

    if (!email || !emailRegex.test(email)) {
      this.alertMessageEmail = 'Por favor ingresa un correo electrónico válido';
      await this.presentAlert(this.alertMessageEmail);
      return;
    }

    const loading = await this.loadingController.create({ message: 'Enviando correo...' });
    await loading.present();

    this.apiService.getRecoverPassEmail({ email }).subscribe({
      next: async (response) => {
        await loading.dismiss();
        if (response?.result === 201) {
          this.dialogPass.dismiss();
          this.dialogCode.present();
        } else {
          await this.presentAlert('No se pudo enviar el correo.');
        }
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Error en recuperación de contraseña:', error.message);
        await this.presentAlert('Error en recuperación de contraseña');
      }
    });
  }

  onDismissDialogPass() {
    this.dialogPass.dismiss();
    this.emailRecover = '';
  }

  isDialogOpen(modal: IonModal) {
    return modal?.isOpen ?? false;
  }

  async validateEmail(): Promise<boolean> {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.alertMessageEmail = '';

    const email = this.isDialogOpen(this.dialogPass) ? this.emailRecover : this.email;

    if (!email) return false;
    if (!emailRegex.test(email)) {
      this.alertMessageEmail = 'Por favor ingresa un correo electrónico válido';
      return false;
    }

    const loading = await this.loadingController.create({ message: 'Verificando correo...' });
    await loading.present();

    try {
      const response: any = await lastValueFrom(this.apiService.getVerificEmail({ email }));

      // Guardar datos de usuario sin afectar ngModel
      this.zone.run(() => {
        localStorage.setItem('fullname', response.fullname ?? '');
        localStorage.setItem('email', response.email ?? '');
        localStorage.setItem('icon_profile', response.user?.icon ?? '');
        localStorage.setItem('icon_front', response.user?.icon_front ?? '');
        localStorage.setItem('social_link', JSON.stringify(response.user?.social_link ?? ''));
        localStorage.setItem('specialization', response.user?.specialization ?? '');
        localStorage.setItem('phone', response.phone ?? '');
        localStorage.setItem('address', response.address ?? '');
        localStorage.setItem('sex', response.sex ?? '');
        localStorage.setItem('civil_status', response.civil_status ?? '');
        localStorage.setItem('family_responsibilities', response.family_responsibilities ?? '');
        localStorage.setItem('birthdate', response.birthdate ?? '');
        localStorage.setItem('level_study', response.level_study ?? '');
        localStorage.setItem('blood_type', response.blood_type ?? '');
        localStorage.setItem('allergies', response.allergies ?? '');
        localStorage.setItem('user_id', response.id ?? '');
        localStorage.setItem('location', response.location ?? '');
        localStorage.setItem('experienceYear', response.experience ?? '');
        localStorage.setItem('about', response.about ?? '');
      });

      return true;
    } catch (error: any) {
      await this.zone.run(async () => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: error?.error?.message || 'Error al verificar el correo',
          buttons: ['OK'],
        });
        await alert.present();
      });
      return false;
    } finally {
      await loading.dismiss();
    }
  }


  async changePassword(): Promise<void> {
    if (!this.passwd || !this.confirm_password) {
      await this.presentAlert('Por favor, introduzca su nueva contraseña para continuar.');
      return;
    }

    if (this.passwd !== this.confirm_password) {
      await this.presentAlert('Las contraseñas ingresadas no coinciden. Por favor, verifíquelas.');
      return;
    }

    const body = { code: this.code, passwd: this.passwd, confirm_password: this.confirm_password };

    this.apiService.changePass(body).subscribe({
      next: async (response) => {
        if (response.status === 201) {
          await this.presentAlert('Contraseña cambiada exitosamente.', 'success');
          this.dialogCode.dismiss();
          this.emailRecover = '';
          this.code = '';
          this.passwd = '';
          this.confirm_password = '';
        } else {
          await this.presentAlert('No se pudo cambiar la contraseña.');
        }
      },
      error: (err) => {
        console.error('Error en el cambio de contraseña:', err.message);
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

  goTo(screen: string) {
    this.router.navigateByUrl(screen);
  }

  openDialogCode() {
    this.dialogPass.dismiss();
    this.dialogCode.present();
  }
}
