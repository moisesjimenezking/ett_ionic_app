import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { Observable, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { IonMenu, IonModal } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('openNewJob') openNewJob: any;
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;
  @ViewChild('logoutDialog', { read: IonModal }) logoutDialog!: IonModal;

  fullName = localStorage.getItem('fullname')
  accountType = localStorage.getItem('accountType') === "COMPANY" ? true : false;
  icon = "";
  temporalIcon = "";
  
  showErrorMessage: boolean = false;

  title: string = '';
  type_time: string = '';
  description: string = '';
  location: string = '';
  requeriment: string[] = [];
  amount: string = '';

  newItem: string = '';
  itemList: string[] = [];
  closeModal: boolean = false;


  jobList: any;

  selectedJobTypeIndex = 0;
  showToast = false;
  toastMsg = '';

  typingTimer: any;
  doneTypingInterval = 1000; // 1 segundo


  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.icon = this.stablishUrlPic(localStorage.getItem('icon_profile'));
  }

  stablishUrlPic (current: any){
    let iconItem = current; 
    let value = (iconItem === null || iconItem === '' || iconItem === 'null') ? `${localStorage.getItem('rute')}/img/iconHuman.jpg` : `${localStorage.getItem('rute')}/img/${iconItem}`;

    return value
  }

  searchIcon(item: any): string{
    let newIcon = this.stablishUrlPic(item)
    return newIcon;
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  goToDetails(screen: any, item: any) {
    this.ionViewWillEnter();
    this.router.navigateByUrl(screen);
    let itemAux = this.details();

    if (itemAux.id !== item.id) {
      localStorage.setItem('jobs', JSON.stringify(item));
    }
  }

  details() {
    const storedItemString = localStorage.getItem('jobs');
    if (storedItemString) {
      return JSON.parse(storedItemString);
    }else{
      return {};
    }
  }

  ionViewWillEnter() {
    const body: { [key: string]: any } = {};
    if(this.accountType){
      body["user_id"] = localStorage.getItem('user_id')
    }

    this.apiService.allJobsApi(body).subscribe((data) => {
      this.jobList = data;
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

    if(this.accountType){
      body["user_id"] = localStorage.getItem('user_id')
    }

    this.apiService.allJobsApi(body).subscribe((data) => {
      this.jobList = data;
      this.cdr.detectChanges();
    });
  }

  saveAndCloseModal() {
    this.saveNewRecord()
    if (this.closeModal) {
      this.openNewJob.dismiss();
      const search = {
        user_id: localStorage.getItem('user_id')
      }
      setTimeout(() => {
        this.apiService.allJobsApi(search).subscribe((data) => {
          this.jobList = data;
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
  
  formatAmount() {
    this.amount = this.amount.replace(/[^0-9$]/g, '');
    if (!this.amount.startsWith('$')) {
      this.amount = '$' + this.amount;
    }
  }

  saveNewRecord(){
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

    if(this.description){
      body["description"] = this.description
    }
    
    if(this.location){
      body["location"] = this.location
    }

    if(this.requeriment){
      body["requeriment"] = this.requeriment
    }

    let fin = false
    if(this.apiService.postJobs(body)){
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
  
  removeItem(item: string) {
    this.requeriment = this.requeriment.filter(i => i !== item);
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
