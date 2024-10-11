import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonMenu, AlertController } from '@ionic/angular';
import { throwError } from 'rxjs';

import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-new-jobs',
  templateUrl: './new-jobs.page.html',
  styleUrls: ['./new-jobs.page.scss'],
})
export class NewJobsPage implements OnInit {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;

  title: string = '';
  type_time: string = '';
  description: string = '';
  location: string = '';
  requeriment: string[] = [];
  amount: string = '';

  newItem: string = '';
  itemList: string[] = [];
  closeModal: boolean = false;
  showErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController,
    private apiServiceNewJobs: ApiService,

  ) { }

  ngOnInit() {
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  goBack() {
    this.navCtrl.back()
  }

  closeMenu() {
    if (this.menu) {
      this.menu.close();
    }
  }

  logout() {
    this.closeMenu();
  }

  addItemToList() {
    if (this.newItem.trim() !== '') {
      this.requeriment.push(this.newItem);
      this.newItem = '';
    }
  }

  removeItem(item: string) {
    this.requeriment = this.requeriment.filter(i => i !== item);
  }

  setWorktypeTime(value: string) {
    this.type_time = value;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertSuccess(message: string) {
    this.title = '';
    this.type_time = '';
    this.description = '';
    this.location = '';
    this.requeriment = [];
    this.amount = '';

    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  formatAmount() {
    this.amount = this.amount.replace(/[^0-9$]/g, '');
    if (!this.amount.startsWith('Bs ')) {
      this.amount = 'Bs ' + this.amount;
    }
  }

  saveNewRecord() {
    this.amount = this.amount.replace(/[^0-9]/g, '');
    if (!this.title || !this.type_time || !this.amount || this.amount === '') {
      this.showErrorMessage = true;
      let errorMessage = 'Por favor completa todos los campos';
      this.closeModal = false;
      this.presentAlert(errorMessage);
      return throwError(() => new Error(errorMessage));
    }

    this.showErrorMessage = false;
    this.closeModal = true;

    const body: { [key: string]: any } = {
      user_id: localStorage.getItem('user_id'),
      title: this.title,
      type_time: this.type_time,
      amount: this.amount,
    };

    if (this.description) {
      body["description"] = this.description
    }

    if (this.location) {
      body["location"] = this.location
    }

    if (this.requeriment) {
      body["requeriment"] = this.requeriment
    }

    let fin = false
    if (this.apiServiceNewJobs.postJobs(body)) {
      fin = true;
      this.presentAlertSuccess("Nueva oferta creada.");
    }
    return fin;
  }
}
