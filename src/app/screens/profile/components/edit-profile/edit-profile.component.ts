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
  rifImg = '';

  identificationValue: string = '';
  identificationImg = '';

  licenceValue: string = '';
  licenceImg = '';

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
    const rif = JSON.parse(localStorage.getItem('rif') ?? "");
    if (rif) {
      this.rifValue = rif.text;
      this.rifImg = rif.img;
    }

    const idenfitication = JSON.parse(localStorage.getItem('identification') ?? "");
    if (idenfitication) {
      this.identificationValue = idenfitication.text;
      this.identificationImg = idenfitication.img;
    }

    const licence = JSON.parse(localStorage.getItem('license') ?? '');
    if (licence) {
      this.licenceValue = licence.text;
      this.licenceImg = licence.img;
    }

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
      body['rif_text'] = this.rifValue;
    }

    if (this.utils.isBase64(this.rifImg)) {
      body['rif_img'] = this.rifImg;
    }


    if (this.identificationValue) {
      body['identification_text'] = this.identificationValue;
    }

    if (this.utils.isBase64(this.identificationImg)) {
      body['identification_img'] = this.identificationImg;
    }


    if (this.licenceValue) {
      body['licence_text'] = this.licenceValue;
    }

    if (this.utils.isBase64(this.licenceImg)) {
      body['licence_img'] = this.licenceImg;
    }

    this.isSubmitting = true;
    this.apiServic.putUser(body).subscribe({
      next: (data: any) => {
        this.fullName = data.fullname;
        this.email = data.email;
        this.mobile = data.phone;
        this.specialization = data.specialization;
        this.websitesList = data.social_link;
        this.rifValue = data.rif_text;
        this.rifImg = data.rif_img;
        this.identificationValue = data.identification_text;
        this.identificationImg = data.identification_img
        this.licenceValue = data.licence_text;
        this.licenceImg = data.licence_img;

        localStorage.setItem('fullname', data.fullname);
        localStorage.setItem('email', data.email);
        localStorage.setItem('phone', data.phone);
        localStorage.setItem('social_link', JSON.stringify(data.social_link));
        localStorage.setItem('specialization', data.specialization);
        localStorage.setItem('rif', JSON.stringify({
          text: data.rif_text,
          img: data.rif_img
        }));
        localStorage.setItem('identification', JSON.stringify({
          text: data.identification_text,
          img: data.identification_img
        }));
        localStorage.setItem('licence', JSON.stringify({
          text: data.licence_text,
          img: data.licence_img
        }));

        this.onChange.emit({
          fullname: data.fullname,
          email: data.email,
          phone: data.phone,
          social_link: data.social_link,
          specialization: data.specialization
        });

        this.isSubmitting = false;

        modal.dismiss();
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }


  isBase64(value: string | null) {
    if (value == null) return false;
    return this.utils.isBase64(value) || this.isALinkk(value);
  }

  isALinkk(value: string | null) {
    if (value == null) return false;
    return this.utils.isALink(value);
  }

  onFileChange(event: Event, type: 'rif' | 'identification' | 'licence') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'rif') {
          this.rifImg = e.target.result;
          return;
        }
        if (type === 'identification') {
          this.identificationImg = e.target.result; // Guarda la URL del archivo
          return;
        }

        this.licenceImg = e.target.result;

      };
      reader.readAsDataURL(file); // Lee el archivo como URL
    }
  }

  onRemoveFile(type: 'rif' | 'identification' | 'licence') {
    if (type == 'rif') {
      this.rifImg = '';
      this.cdr.detectChanges();
      return;
    }

    if (type == 'identification') {
      this.identificationImg = '';
      this.cdr.detectChanges();
      return;
    }

    this.licenceImg = '';
    this.cdr.detectChanges();
  }
}
