import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController, IonModal } from '@ionic/angular';
import { throwError } from 'rxjs';

import { ApiService } from '@/service/api.service';


@Component({
  selector: 'app-edit-job-detail',
  templateUrl: './edit-job-detail.component.html',
  styleUrls: ['./edit-job-detail.component.scss'],
})
export class EditJobDetailComponent implements OnInit, OnChanges {
  @ViewChild('openEditJobs', { read: IonModal }) modal!: IonModal;
  @Input({ required: true }) job: any;

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

  presentingElement: HTMLDivElement | null = null;
  isWorktypeTimeModalOpen = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController,
    private apiService: ApiService,

  ) { }

  ngOnInit() {

    this.title = this.job.title;
    this.type_time = this.job.type_time;
    this.description = this.job.description;
    this.location = this.job.location;
    this.requeriment = this.job.requeriment;
    this.amount = this.job.amount;

    this.presentingElement = document.getElementById('edit-job-modal') as HTMLDivElement | null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job']) {
      console.log("Job ", changes['job']);
    }
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  goBack() {
    this.navCtrl.back()
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

  openModalWorktypeTime() {
    this.isWorktypeTimeModalOpen = true;
  }

  setWorktypeTime(value: string) {
    console.log("Select value type time", value);
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

  saveAndCloseModal() {
    this.saveNewRecord()
    if (this.closeModal) {
      this.modal?.dismiss();
      setTimeout(() => {
        this.apiService.allJobsApi({ id: this.job.id }).subscribe((data: any) => {
          let result = data[0];
          localStorage.setItem('jobs', JSON.stringify(result));

        });
      }, 1000);
    }
  }

  saveNewRecord() {

    this.amount = this.amount.replace(/[^0-9.]/g, '');

    if (!this.title || !this.type_time || !this.amount || this.amount === '') {
      this.showErrorMessage = true;
      let errorMessage = 'Por favor completa todos los campos';
      this.closeModal = false;
      this.presentAlert(errorMessage);
      return throwError(() => new Error(errorMessage));
    }

    this.showErrorMessage = false;
    this.closeModal = true;

    const body = {
      id: this.job.id,
      title: this.title,
      type_time: this.type_time,
      amount: this.amount,
      description: this.description,
      location: this.location,
      requeriment: this.requeriment
    };

    let fin = false
    if (this.apiService.putJobs(body)) {
      fin = true;
    }
    return fin;
  }


}
