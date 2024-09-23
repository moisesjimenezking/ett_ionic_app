import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditProfilePage implements OnInit {

  fullName = localStorage.getItem('fullname');
  email = localStorage.getItem('email');
  password = '123456789';
  sexo = localStorage.getItem('sex');
  telefono = localStorage.getItem('phone');
  residencia = localStorage.getItem('address');
  imageUrl = '../../../assets/images/users/user1.jpeg';
  civilState = '';
  cargeFamily: number = 0;
  dateTime: string = "";
  selectedFile = "https://ionicframework.com/docs/img/demos/card-media.png"
  bloodType ="";
  alergiType = "";
  selectedFiles: File[] = [];
  
  alertMessageEmail: string = "";
  alertMessagedatetime: string = "";
  alertMessageFamily:  string = "";


  constructor(private navCtrl: NavController, public platform:Platform, private http: HttpClient){
  }

  ngOnInit() {
  }
  
  validateDate() {
    this.alertMessagedatetime = new Date(this.dateTime) > new Date() 
      ? 'La fecha de nacimiento no puede ser futura' 
      : '';
  }

  validateFamilyCarge() {
    this.alertMessageFamily = this.cargeFamily > 20 || this.cargeFamily < 0
      ? 'Las cargas familiares deben ser entre 0 y 20'
      : '';
  }

  customOptions: any = {
    cssClass: 'custom-select'
  };

  openFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFile = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  goBack() {
    this.navCtrl.back();
  }
}