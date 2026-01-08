import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController, IonModal } from '@ionic/angular';
import { ApiService } from '@/service/api.service';
import { JobModel } from '@/types';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // si usas ngModel


@Component({
  selector: 'app-edit-job-detail',
  templateUrl: './edit-job-detail.component.html',
  styleUrls: ['./edit-job-detail.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class EditJobDetailComponent implements OnInit, OnChanges {
  @ViewChild('openEditJobs', { read: IonModal }) modal!: IonModal;
  @ViewChild('ScrollContainer') scrollContainer?: ElementRef;
  @Input({ required: true }) job!: JobModel;

  @Output() onChange = new EventEmitter<JobModel>();

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

  isSubmitting = false;

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

  openModalWorktypeTime() {
    this.isWorktypeTimeModalOpen = true;
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

  scrollToBottom(): void {
    this.scrollContainer?.nativeElement.scroll({
      top: this.scrollContainer?.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  formatAmount() {
    this.amount = this.amount.replace(/[^0-9$]/g, '');
    if (!this.amount.startsWith('REF ')) {
      this.amount = 'REF ' + this.amount;
    }
  }


  saveNewRecord() {

    this.amount = this.amount.replace(/[^0-9.]/g, '');

    if (!this.title || !this.type_time || !this.amount || this.amount === '') {
      this.showErrorMessage = true;
      let errorMessage = 'Por favor completa todos los campos';
      this.presentAlert(errorMessage);
    }


    const body = {
      id: this.job.id,
      title: this.title,
      type_time: this.type_time,
      amount: this.amount,
      description: this.description,
      location: this.location,
      requeriment: this.requeriment
    };

    this.isSubmitting = true;
    this.apiService.putJobs(body).subscribe({
      next: (data) => {
        this.job = data;
        localStorage.setItem('jobs', JSON.stringify(data));
        this.onChange.emit(data);
        this.showErrorMessage = false;
        this.isSubmitting = false;
        this.modal?.dismiss();
      }, error: () => {
        this.showErrorMessage = false;

        this.isSubmitting = false;
      }
    })
  }


}
