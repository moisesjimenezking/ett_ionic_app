import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, NavController } from '@ionic/angular';
import { ApiService } from '@/service/api.service';
import { UtilsLib } from '@/lib/utils';


export type EditAboutEvent = {
  location: string,
  experienceYear: any,
  about: string,
};

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.scss'],
})
export class EditAboutComponent implements OnInit {

  @Output() onChange = new EventEmitter<EditAboutEvent>();

  yearsList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  location: any = '';
  experienceYear: any = '';
  about: any = '';

  utils = new UtilsLib();

  isSubmitting = false;

  constructor(
    private navCtrl: NavController,
    private apiAbout: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.location = localStorage.getItem('location')?.replace('null', '');
    this.experienceYear = localStorage.getItem('experienceYear')?.replace('null', '');
    this.about = localStorage.getItem('about')?.replace('null', '');

  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  updateUser(modal: IonModal) {
    const body: { [key: string]: any } = {};
    if (this.location) {
      body["location"] = this.location
    }

    if (this.experienceYear) {
      body["experience"] = this.experienceYear
    }

    if (this.about) {
      body["about"] = this.about
    }

    this.isSubmitting = true;

    this.apiAbout.putUser(body).subscribe({
      next: (data: any) => {
        this.location = data.location;
        this.experienceYear = data.experience;
        this.about = data.about;

        localStorage.setItem('location', data.location);
        localStorage.setItem('experienceYear', data.experience);
        localStorage.setItem('about', data.about);

        this.isSubmitting = false;

        this.onChange.emit({
          location: this.location,
          experienceYear: this.experienceYear,
          about: this.about
        });
        this.cdr.detectChanges();
        modal.dismiss();

      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }


}
