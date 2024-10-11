import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController, AlertController, IonMenu, IonModal } from '@ionic/angular';
import { catchError, switchMap, tap, throwError } from 'rxjs';

import { ApiService } from '@/service/api.service';
import { UtilsLib } from 'src/app/lib/utils';
import { JobModel } from '@/types';


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {
  @ViewChild('modal') modal: any;
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;
  @ViewChild('logoutDialog', { read: IonModal }) logoutDialog!: IonModal;

  dataJobs = this.details()!;

  isApplying = false;
  applied: boolean = this.dataJobs.appliedUser;
  applyButton = this.applied
    ? "Ya has aplicado a esta oferta"
    : "Aplicar ahora";

  utils = new UtilsLib();

  account = localStorage.getItem('accountType');
  isAccountCompany = this.account == 'COMPANY';

  isProcessing = false;

  title = this.dataJobs.title;
  type_time = this.dataJobs.type_time;
  description = this.dataJobs.description;
  location = this.dataJobs.location;
  requeriment: string[] = this.dataJobs.requeriment;
  amount = this.dataJobs.amount;


  newItem: string = '';
  itemList: string[] = [];
  closeModal: boolean = false;

  showErrorMessage: boolean = false;
  message: string = '';
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private apiJobsService: ApiService,
    private cdr: ChangeDetectorRef,
    private modalController: ModalController,
    private alertController: AlertController,

  ) { }

  details(): JobModel | null {
    const storedItemString = localStorage.getItem('jobs');
    if (storedItemString) {
      return JSON.parse(storedItemString);
    } else {
      return null;
    }
  }

  ngOnInit() {
    this.dataJobs = this.details()!;
    this.applied = this.dataJobs.appliedUser;
    this.applyButton = this.applied
      ? "Ya has aplicado a esta oferta"
      : "Aplicar ahora";



  }

  goBack() {
    this.navCtrl.back()
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  goToDetails(screen: any, item: any) {
    this.router.navigateByUrl(screen);
    localStorage.setItem('candidate', JSON.stringify(item));
    this.cerrarModal()
  }

  applicateJob() {
    if (!this.applied) {
      const body = {
        "jobs_id": this.dataJobs.id
      }

      this.apiJobsService.postJobsApplied(body)
        .pipe(
          tap(() => { this.isApplying = false }),
          catchError((error) => {
            this.isApplying = false;
            return error;
          }),
          switchMap(() => this.apiJobsService.allJobsApi({ id: this.dataJobs.id }))
        )
        .subscribe({
          next: (jobs) => {
            const job = jobs.find(j => j.id == this.dataJobs.id)!;
            localStorage.setItem('jobs', JSON.stringify(job));
            this.dataJobs = job;

            this.applied = this.dataJobs.appliedUser;
            this.applyButton = this.applied
              ? "Ya has aplicado a esta oferta"
              : "Aplicar ahora";
            this.cerrarModal();
            this.cdr.detectChanges();
          }
        });


    }
  }

  stablishUrlPic(current: any) {
    let iconItem = current;
    let value = (iconItem === null || iconItem === '' || iconItem === 'null') ? `${localStorage.getItem('rute')}/img/iconHuman.jpg` : `${localStorage.getItem('rute')}/img/${iconItem}`;

    return value
  }

  searchIcon(item: any): string {
    let newIcon = this.stablishUrlPic(item)
    return newIcon;
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  modalDidPresent() {
    this.dataJobs = this.details()!;
    this.applied = this.dataJobs.appliedUser;
    this.applyButton = this.applied
      ? "Ya has aplicado a esta oferta"
      : "Aplicar ahora";

    let result = this.applied ? false : true;
    this.cdr.detectChanges();
    return result;
  }

  saveAndCloseModal() {
    this.saveNewRecord()
    if (this.closeModal) {
      setTimeout(() => {
        this.apiJobsService.allJobsApi({ id: this.dataJobs.id }).subscribe((data) => {
          const job = data.find(j => j.id == this.dataJobs.id)!;
          localStorage.setItem('jobs', JSON.stringify(job));
          this.dataJobs = job;
          this.cdr.detectChanges();
        });
      }, 1000);
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
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
      id: this.dataJobs.id,
      title: this.title,
      type_time: this.type_time,
      amount: this.amount,
      description: this.description,
      location: this.location,
      requeriment: this.requeriment
    };

    let fin = false
    if (this.apiJobsService.putJobs(body)) {
      fin = true;
    }
    return fin;
  }

  addItemToList() {
    if (this.newItem.trim() !== '') {
      this.requeriment.push(this.newItem);
      this.newItem = '';
    }
  }

  formatAmount() {
    this.amount = this.amount.replace(/[^0-9.$]/g, '');
    if (!this.amount.startsWith('$')) {
      this.amount = '$' + this.amount;
    }
    console.log(this.amount)
  }

  removeItem(item: string) {
    this.requeriment = this.requeriment.filter(i => i !== item);
  }

  sendMessage(message: string) {
    if (this.isProcessing) return; // Evita múltiples clics
    this.isProcessing = true;

    const body = {
      "user_sending_id": localStorage.getItem('user_id'),
      "user_recept_id": this.dataJobs.user_id
    }

    setTimeout(() => {
      this.apiJobsService.postChats(body).subscribe((data: any) => {
        const body = {
          'message': message,
          'chats_id': data.id,
          'jobs_id': this.dataJobs.id
        }

        setTimeout(() => {
          this.apiJobsService.postMessage(body).subscribe((data: any) => {
            this.isProcessing = false;
          });
        }, 50);
      }, (error) => {
        // Manejar el error de postChats aquí
        this.isProcessing = false;
        console.error("Error al crear el chat:", error);
      });
    }, 1000);
  }

  closeMenu() {
    if (this.menu) {
      this.menu.close();
    }
  }

  logout() {
    this.closeMenu();
  }
}
