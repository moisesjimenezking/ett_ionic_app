import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController, IonMenu, IonModal } from '@ionic/angular';

import { ApiService } from '@/service/api.service';
import { JobModel } from '@/types';
import { homeBannerCompanyAsset, homeBannerPersonAsset } from '@/lib/constanst/assets';
import { UtilsLib } from '@/lib/utils';
import { JobCardComponent } from './components/job-card/job-card.component';
import { CompanyEmptyStateComponent } from './components/company-empty-state/company-empty-state.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ImgComponent } from '@/components/img/img.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    JobCardComponent,
    CompanyEmptyStateComponent,
    ImgComponent
  ]
})
export class HomePage implements OnInit {
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
  ) { }

  ngOnInit() {
    this.fullName = localStorage.getItem('fullname') ?? '';
    this.isAccountCompany = localStorage.getItem('accountType') === "COMPANY"
    this.icon = this.stablishUrlPic(localStorage.getItem('icon_profile'));
    this.homeBannerImage = this.isAccountCompany ? homeBannerCompanyAsset :
      homeBannerPersonAsset;
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
    this.apiService.allJobsApi(body, { showError: false }).subscribe({
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

    this.apiService.allJobsApi(body).subscribe((data) => {
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
