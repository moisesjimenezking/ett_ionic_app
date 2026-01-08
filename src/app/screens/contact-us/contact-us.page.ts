import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class ContactUsPage implements OnInit {

  fullName=localStorage.getItem('fullname');
  email=localStorage.getItem('email');
  message='';

  constructor(private navCtrl: NavController,) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }


}
