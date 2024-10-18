import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController, AlertController, IonMenu, IonModal } from '@ionic/angular';
import { catchError, switchMap, throwError } from 'rxjs';

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

  protected readonly utils = new UtilsLib();


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

      this.isApplying = true;
      this.apiJobsService.postJobsApplied(body)
        .pipe(
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
            this.isApplying = false;
            this.cerrarModal();
            this.cdr.detectChanges();
          },
          error: () => {
            this.isApplying = false;
          }
        });


    }
  }


  stablishUrlPic(url: string | null) {
    return this.utils.stablishUrlPic(url);
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


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
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

  }

  removeItem(item: string) {
    this.requeriment = this.requeriment.filter(i => i !== item);
  }

  onJobEditChange(job: JobModel) {
    this.dataJobs = job;
  }

}
