import { Component, OnInit, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ApiService } from '@/service/api.service';
import { UtilsLib } from '@/lib/utils';

export type EditProfileEvent = {
  fullname: string,
  email: string,
  phone: string,
  social_link: any,
  specialization: any
};

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  @Output() onChange = new EventEmitter<EditProfileEvent>();


  emailVerified: boolean = true;
  fullName: any = '';
  specialization: any = '';
  email: any = '';
  mobile: any = '';
  code: string = '';
  newWebsite: string = '';
  websitesList: string[] = [];
  isModalOpen = false;

  rifValue: string = '';

  identificationValue: string = '';

  licenceValue: string = '';

  selectedFile: File | null = null;

  protected readonly utils = new UtilsLib();

  websiteTypesList = [
    "Personal",
    "Compañía",
    "Blog",
    "RSS Feed",
    "Portafolio",
    "Otro",
  ];

  showWebsiteTypeSheet = false;
  selectedWebsiteType = '';
  selectedItemIndex: any;
  alertMessageEmail: string = '';

  isSubmitting = false;

  constructor(
    private navCtrl: NavController,
    private apiServic: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fullName = localStorage.getItem('fullname');
    this.email = localStorage.getItem('email');
    this.mobile = localStorage.getItem('phone');
    this.specialization = localStorage.getItem('specialization') === 'null' ? '' : localStorage.getItem('specialization');
    let listWeb = localStorage.getItem('social_link');
    if (listWeb) {
      this.websitesList = JSON.parse(listWeb);
    }
    this.rifValue = localStorage.getItem('rif')?.replace('null', '') ?? "";
    this.identificationValue = localStorage.getItem('identification')?.replace('null', '') ?? "";
    this.licenceValue = localStorage.getItem('licence')?.replace('null', '') ?? "";
  }

  goBack() {
    this.navCtrl.back();
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  addWebsite() {
    if (this.newWebsite) {
      this.websitesList.push(this.newWebsite);
      this.newWebsite = '';
    }
  }

  removeWebsite(index: number) {
    this.websitesList.splice(index, 1);
  }

  validateEmail() {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.alertMessageEmail = '';
    if (this.email && !emailRegex.test(this.email)) {
      this.alertMessageEmail = 'Por favor ingresa un correo electrónico válido';
      return false
    }

    return this.apiServic.getVerificEmailFalse({ email: this.email });
  }

  updateUser(modal: IonModal) {
    const body: { [key: string]: any } = {};
    if (this.fullName) {
      body["fullname"] = this.fullName
    }

    if (this.email) {
      body["email"] = this.email
    }

    if (this.mobile) {
      body["phone"] = this.mobile
    }

    if (this.specialization && this.specialization !== 'null') {
      body["specialization"] = this.specialization
    }

    if (this.websitesList) {
      body["social_link"] = this.websitesList
    }

    if (this.rifValue) {

      body['rif'] = this.rifValue;
    }


    if (this.identificationValue) {
      body['identification'] = this.identificationValue;
    }

    if (this.licenceValue) {
      body['licence'] = this.licenceValue;
    }

    this.isSubmitting = true;
    this.apiServic.putUser(body).subscribe({
      next: (data: any) => {
        this.fullName = data.fullname;
        this.email = data.email;
        this.mobile = data.phone;
        this.specialization = data.specialization;
        this.websitesList = data.social_link;
        this.isSubmitting = false;
        this.rifValue = data.rif;
        this.identificationValue = data.identification;
        this.licenceValue = data.licence;

        localStorage.setItem('fullname', data.fullname);
        localStorage.setItem('email', data.email);
        localStorage.setItem('phone', data.phone);
        localStorage.setItem('social_link', JSON.stringify(data.social_link));
        localStorage.setItem('specialization', data.specialization);
        localStorage.setItem('rif', data.rif);
        localStorage.setItem('identification', data.identification);
        localStorage.setItem('licence', data.licence);

        this.onChange.emit({
          fullname: data.fullname,
          email: data.email,
          phone: data.phone,
          social_link: data.social_link,
          specialization: data.specialization
        });


        modal.dismiss();
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }


  isBase64(value: string) {
    return this.utils.isBase64(value);
  }

  onFileChange(event: Event, type: 'rif' | 'identification' | 'licence') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'rif') {
          this.rifValue = e.target.result;
          return;
        }
        if (type === 'identification') {
          this.identificationValue = e.target.result; // Guarda la URL del archivo
          return;
        }

        this.licenceValue = e.target.result;

      };
      reader.readAsDataURL(file); // Lee el archivo como URL
    }
  }

  onRemoveFile(type: 'rif' | 'identification' | 'licence') {
    if (type == 'rif') {
      this.rifValue = '';
      this.cdr.detectChanges();
      return;
    }

    if (type == 'identification') {
      this.identificationValue = '';
      this.cdr.detectChanges();
      return;
    }

    this.licenceValue = '';
    this.cdr.detectChanges();
  }
}
