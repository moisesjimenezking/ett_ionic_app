import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { IonMenu, IonModal } from '@ionic/angular';
import { EditProfileEvent } from './components/edit-profile/edit-profile.component';
import { AddSkillsEvent } from './components/add-skills/add-skills.component';
import { EditAboutEvent } from './components/edit-about/edit-about.component';
import { assetsPath } from '@/lib/constanst/assets';
import { UtilsLib } from '@/lib/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;
  @ViewChild('logoutDialogProfile', { read: IonModal }) logoutDialog!: IonModal;
  @ViewChild('rifInput') rifInput!: ElementRef;
  @ViewChild('identificacionInput') identificacionInput!: ElementRef;
  @ViewChild('conducirInput') conducirInput!: ElementRef;

  rifPdf: string | null = null;
  rifValue: string = '';
  identificacionPdf: string | null = null;
  conducirPdf: string | null = null;

  account = localStorage.getItem('accountType');
  isProfileLoaded = false;
  fullName: any = '';
  specialization = localStorage.getItem('specialization') === 'null' ? '' : localStorage.getItem('specialization');;
  email: any = '';
  phone: any = '';
  icon = '';
  iconFront = '';

  isModalOpen = false;
  modalValue: string = '';

  typingTimer: any;
  doneTypingInterval = 1000;

  websitesList: any = [];

  showMore = false;
  currentSkill: string[] = [];

  workExperiencesList = [
    {
      id: "1",
      serviceLogo: `${assetsPath}/images/jobs/job6.png`,
      post: "Sr. UI/UX Designer (Team Lead)",
      serviceProvider: "Infosys Technologies",
      experience: "2019 Dec - Present (2y, 4m)",
    },
    {
      id: "2",
      serviceLogo: `${assetsPath}/images/jobs/job5.png`,
      post: "Jr. UI/UX Designer",
      serviceProvider: "Android",
      experience: "2018 Aug - 2019 Dec  (1y, 6m)",
    },
  ];

  location: any = '';
  experienceYear: any = '';
  about: any = '';

  protected readonly utils = new UtilsLib();

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private apService: ApiService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {

    this.defineData();
  }

  ionViewWillEnter() {
    this.defineData();
  }

  ngAfterViewInit() {
    this.defineData();
  }

  defineData() {
    this.isProfileLoaded = false;
    setTimeout(() => {
      this.fullName = localStorage.getItem('fullname');
      this.email = localStorage.getItem('email');
      this.phone = localStorage.getItem('phone');
      this.specialization = localStorage.getItem('specialization') === 'null' ? '' : localStorage.getItem('specialization') ?? '';
      this.icon = this.stablishUrlPic(localStorage.getItem('icon_profile')) ?? '';
      this.iconFront = this.stablishUrlPic(localStorage.getItem('icon_front')) ?? '';
      this.location = localStorage.getItem('location') ?? '';
      this.experienceYear = localStorage.getItem('experienceYear') ?? '';
      this.about = localStorage.getItem('about') ?? '';
      let listWeb = localStorage.getItem('social_link');
      if (listWeb) {
        this.websitesList = JSON.parse(listWeb);
      }
      let listCurrentSkill = localStorage.getItem('skills');
      if (listCurrentSkill) {
        this.currentSkill = JSON.parse(listCurrentSkill);
      }
      this.isProfileLoaded = true;
      this.cdr.detectChanges();
    }, 1000);
  }

  stablishUrlPic(url: string | null) {
    return this.utils.stablishUrlPic(url);
  }


  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  goBack() {
    this.navCtrl.back()
  }

  openModal(img: string) {
    this.modalValue = img;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalValue = '';
  }

  deletePic() {
    const body: { [key: string]: any } = {}
    let iconBeforeChange = this.icon;
    if (this.modalValue === "profile") {
      this.icon = this.stablishUrlPic("");
      body["icon"] = "";
    } else {
      iconBeforeChange = this.iconFront;
      this.iconFront = this.stablishUrlPic("");
      body["icon_front"] = "";
    }

    setTimeout(() => {
      this.apService.putUser(body).subscribe({
        next: (data: any) => {
          this.icon = this.stablishUrlPic(data.icon);
          this.iconFront = this.stablishUrlPic(data.icon_front);
          localStorage.setItem('icon_profile', data.icon);
          localStorage.setItem('icon_front', data.icon_front);

          this.cdr.detectChanges();
        },
        error: () => {
          if (this.modalValue === "profile") {
            this.icon = iconBeforeChange;
          } else {
            this.iconFront = iconBeforeChange;

          }

        }
      });
    }, 50);
  }

  updatePic(base64String: string) {
    const body: { [key: string]: any } = {}
    let iconBeforeChange = this.icon;
    if (this.modalValue === "profile") {
      this.icon = base64String;
      body["icon"] = base64String;
    } else {
      iconBeforeChange = this.iconFront;
      this.iconFront = base64String;
      body["icon_front"] = base64String;
    }

    setTimeout(() => {
      this.apService.putUser(body).subscribe({
        next: (data: any) => {

          this.icon = this.stablishUrlPic(data.icon);
          this.iconFront = this.stablishUrlPic(data.icon_front);

          localStorage.setItem('icon_profile', data.icon);
          localStorage.setItem('icon_front', data.icon_front);

          this.cdr.detectChanges();
        },
        error: () => {
          if (this.modalValue === "profile") {
            this.icon = iconBeforeChange;
          } else {
            this.iconFront = iconBeforeChange;
          }
        }
      }
      );
    }, 50);
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        this.updatePic(base64String);
      };
      reader.readAsDataURL(file);
    }
  }

  closeMenu() {
    if (this.menu) {
      this.menu.close();
    }
  }

  logout() {
    localStorage.clear();
    this.closeMenu();
  }

  downloadPdf(pdfUrl: string | null) {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  }

  onFileChange(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'rif') {
          this.rifPdf = e.target.result; // Guarda la URL del archivo
        } else if (type === 'identificacion') {
          this.identificacionPdf = e.target.result; // Guarda la URL del archivo
        } else if (type === 'conducir') {
          this.conducirPdf = e.target.result; // Guarda la URL del archivo
        }
      };
      reader.readAsDataURL(file); // Lee el archivo como URL
    } else {
      if (type === 'rif') this.rifPdf = null;
      else if (type === 'identificacion') this.identificacionPdf = null;
      else if (type === 'conducir') this.conducirPdf = null;
    }
  }

  selectFile(type: string) {
    const input = type === 'rif' ? this.rifInput.nativeElement :
      type === 'identificacion' ? this.identificacionInput.nativeElement :
        this.conducirInput.nativeElement;

    input.click(); // Simula un clic en el input de tipo file
  }


  onChangeEditProfile(event: EditProfileEvent) {
    const { email, fullname, phone, social_link, specialization } = event;

    this.email = email;
    this.fullName = fullname;
    this.phone = phone;
    this.specialization = specialization;
    this.websitesList = social_link;
  }

  onChangeEditAbout(event: EditAboutEvent) {
    const { about, experienceYear, location } = event;

    this.location = location;
    this.experienceYear = experienceYear;
    this.about = about;
  }

  onChangeAddSkillsEvent(event: AddSkillsEvent) {
    const { skills } = event;
    this.currentSkill = [...skills];
  }
}
