import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.page.html',
  styleUrls: ['./courses-detail.page.scss'],
})
export class CoursesDetailPage implements OnInit {
  link: string = 'https://www.google.com';

  description: string = ` 
    Este curso introductorio de Python 
    está diseñado para personas sin experiencia previa en programación. 
    
    A lo largo del curso, aprenderás los conceptos básicos de Python, 
    incluyendo variables, tipos de datos, estructuras de control y funciones. 
    Además, explorarás cómo utilizar Python para resolver problemas y crear programas simples. 
  `

  requirementsList = [
    "1. Un ordenador con acceso a Internet y un editor de texto (se recomienda Visual Studio Code o PyCharm).", 
    "2. Motivación y disposición para aprender programación.",
    "3. No se requiere experiencia previa en programación, pero se recomienda tener familiaridad con conceptos básicos de informática.", 
    "4. Tiempo dedicado para practicar y completar las tareas asignadas en el curso.",
  ];

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  openLink() {
    if (this.link) {
      window.open(this.link, '_blank');
    }
  }

}
