import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.page.html',
  styleUrls: ['./edit-about.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class EditAboutPage implements OnInit {

  yearsList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  location: any = '';
  experienceYear: any = '';
  about: any = '';

  constructor(
    private navCtrl: NavController,
    private apiAbout: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { 
    this.location = localStorage.getItem('location');
    this.experienceYear = localStorage.getItem('experienceYear');
    this.about = localStorage.getItem('about');

  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  updateUser(){
    const body: { [key: string]: any } = {};
    if(this.location){
      body["location"] = this.location
    }

    if(this.experienceYear){
      body["experience"] = this.experienceYear
    }

    if(this.about){
      body["about"] = this.about
    }

    setTimeout(() => {
      this.apiAbout.putUser(body).subscribe((data: any) => {
        this.location = data.location;
        this.experienceYear = data.experience;
        this.about = data.about;

        localStorage.setItem('location'      , data.location);
        localStorage.setItem('experienceYear', data.experience);
        localStorage.setItem('about'         , data.about);
        
        this.cdr.detectChanges();
        this.goTo('profile');
      });
    }, 50);     
  }

}
