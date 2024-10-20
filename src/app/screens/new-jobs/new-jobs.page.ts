import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
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
  @ViewChild('ScrollContainer') scrollContainer?: ElementRef;

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

  isSubmitting = false;
  isAccountCompany = localStorage.getItem('accountType') == 'COMPANY';

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

  addItemToList() {
    if (this.newItem.trim() !== '') {
      const unavailable = this.requeriment.map(r => r.toLowerCase().trim()).includes(this.newItem.toLowerCase())
      if (unavailable) {
        this.presentAlert(`El requerimiento ${this.newItem} ya ha sido agregado.`);
        return;
      }
      this.requeriment.push(this.newItem);
      this.newItem = '';
      if (this.requeriment.length > 8) return;
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
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


  scrollToBottom(): void {
    this.scrollContainer?.nativeElement.scroll({
      top: this.scrollContainer?.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  saveNewRecord() {
    this.amount = this.amount.replace(/[^0-9]/g, '');
    if (!this.title || !this.type_time || !this.amount || this.amount === '') {
      this.showErrorMessage = true;
      let errorMessage = 'Por favor completa todos los campos';
      this.closeModal = false;
      this.presentAlert(errorMessage);

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

    this.isSubmitting = true;
    this.apiServiceNewJobs.postJobs(body).subscribe({
      next: (_) => {
        this.isSubmitting = false;
        this.presentAlertSuccess("Nueva oferta creada.");
        const screen = this.isAccountCompany ? '/bottom-tab-bar-company' : '/bottom-tab-bar';

        this.goTo(`${screen}/home`);
      }, error: () => {
        this.isSubmitting = false;
      }
    });
  }
}
