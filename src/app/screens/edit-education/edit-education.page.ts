import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.page.html',
  styleUrls: ['./edit-education.page.scss'],
})
export class EditEducationPage implements OnInit {

  degreesList = [
    "Licenciatura",
    "Certificados profesionales",
    "Licenciatura",
    "Título de transferencia",
    "Título asociado",
    "Diploma de graduación",
    "Maestría",
    "Doctorado",
    "Titulo profesional",
    "Título de Especialista",
  ];

  universityName='University of South California';
  graducationYear='2018';
  fieldOfStudy='Field of Study';
  selectedDegree=this.degreesList[0];

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

}
