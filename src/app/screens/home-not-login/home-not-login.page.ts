import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController, IonMenu, IonModal, ToastController } from '@ionic/angular';

import { ApiService } from '@/service/api.service';
import { JobModel } from '@/types';
import { homeBannerCompanyAsset, homeBannerPersonAsset } from '@/lib/constanst/assets';
import { UtilsLib } from '@/lib/utils';

@Component({
  selector: 'app-home-not-login',
  templateUrl: './home-not-login.page.html',
  styleUrls: ['./home-not-login.page.scss'],
})
export class HomeNotLoginPage implements OnInit {
  @ViewChild('openNewJob') openNewJob: any;
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;
  @ViewChild('logoutDialog', { read: IonModal }) logoutDialog!: IonModal;

  homeBannerImage = '';

  fullName = "";
  isAccountCompany = false;
  icon = "";
  temporalIcon = "";

  showErrorMessage: boolean = false;


  newItem: string = '';
  itemList: string[] = [];
  closeModal: boolean = false;


  jobList: JobModel[] = [];
  isLoadingJobList = false;

  selectedJobTypeIndex = 0;
  showToast = false;
  toastMsg = '';

  typingTimer: any;
  doneTypingInterval = 1000; // 1 segundo


  protected readonly utils = new UtilsLib();

  constructor(
    private router: Router,
    private apiService: ApiService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.homeBannerImage = homeBannerPersonAsset;
  }

  async showToastMessage(message: string, duration: number = 1000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      mode: 'ios'
    });
    await toast.present();
  }

  stablishUrlPic(url: string | null) {
    return this.utils.stablishUrlPic(url);
  }


  searchIcon(item: any): string {
    let newIcon = this.stablishUrlPic(item)
    return newIcon;
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  goToDetails(screen: string, item: JobModel) {

    this.ionViewWillEnter();

    let tab = this.isAccountCompany ? '/bottom-tab-bar-company' : '/bottom-tab-bar';
    let itemAux = this.details();

    if (itemAux?.id !== item.id) {
      localStorage.setItem('jobs', JSON.stringify(item));
    }

    this.router.navigateByUrl(`${tab}/${screen}`);

  }

  details(): JobModel | null {
    const storedItemString = localStorage.getItem('jobs');
    if (storedItemString) {
      return JSON.parse(storedItemString);
    } else {
      return null
    }
  }

  ionViewWillEnter() {
    const body: { [key: string]: any } = {};
    if (this.isAccountCompany) {
      body["user_id"] = localStorage.getItem('user_id')
    }

    this.jobList = [];
    this.isLoadingJobList = true;
    this.apiService.allJobsApiFree(body, { showError: false }).subscribe({
      next: (data) => {
        this.jobList = data;
        this.isLoadingJobList = false;
      },
      error: (_) => {
        this.isLoadingJobList = false;
      }
    });
  }

  clearPlaceholder() {
    const inputElement = document.querySelector('ion-input');
    if (inputElement) {
      inputElement.placeholder = '';
    }
  }

  resetPlaceholder() {
    const inputElement = this.elementRef.nativeElement.querySelector('ion-input');
    if (inputElement && typeof inputElement.value === 'string' && inputElement.value.trim() === '') {
      inputElement.placeholder = 'Buscar';
    }
  }

  goToSearchDelayed(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement ? inputElement.value : '';
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.goToSearch(searchText);
    }, this.doneTypingInterval);
  }

  goToSearch(searchText: any) {
    const body: { [key: string]: any } = {
      title: searchText,
      type_time: searchText,
      description: searchText,
      location: searchText,
      requeriment: searchText
    }

    if (this.isAccountCompany) {
      body["user_id"] = localStorage.getItem('user_id')
    }

    this.apiService.allJobsApiFree(body).subscribe((data) => {
      this.jobList = data;
      this.cdr.detectChanges();
    });
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
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
