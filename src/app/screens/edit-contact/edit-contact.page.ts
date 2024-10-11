import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { UtilsLib } from 'src/app/lib/utils';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
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
  selectedFile: File | null = null;

  utils = new UtilsLib();

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

  updateUser() {
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

    setTimeout(() => {
      this.apiServic.putUser(body).subscribe((data: any) => {
        this.fullName = data.fullname;
        this.email = data.email;
        this.mobile = data.phone;
        this.specialization = data.specialization;
        this.websitesList = data.social_link;

        localStorage.setItem('fullname', data.fullname);
        localStorage.setItem('email', data.email);
        localStorage.setItem('phone', data.phone);
        localStorage.setItem('social_link', JSON.stringify(data.social_link));
        localStorage.setItem('specialization', data.specialization);

        this.cdr.detectChanges();
        this.goTo(localStorage.getItem('accountType') === "PERSON"
          ? 'bottom-tab-bar/profile'
          : 'bottom-tab-bar-company/profile'
        );
      });
    }, 50);
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    // Handle the selected file here, e.g., upload it to a server
  }
}
