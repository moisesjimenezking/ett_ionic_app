import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { IonRouterOutlet, Platform, AlertController, IonModal } from '@ionic/angular';
import { ApiService } from '@/service/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('dialogPass', { read: IonModal }) dialogPass!: IonModal;
  @ViewChild('dialogCode', { read: IonModal }) dialogCode!: IonModal;

  email: string = '';
  emailRecover: string = '';
  password: string = '';
  securePassword: boolean = true;
  alertMessageEmail: string = '';

  isModalOpen = false;

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

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  showEmailModal() {
    this.isModalOpen = true;
  }

  submitEmail() {
    // Lógica para enviar el email
    this.isModalOpen = false; // Cerrar el modal después de enviar
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
