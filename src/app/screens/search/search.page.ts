import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SearchPage implements OnInit {

  searchResultsList = [
    {
      id: "1",
      sourceLogo: "../../../assets/images/jobs/job1.png",
      jobType: "UI/UX Designer",
      sourceName: "Airbnb",
      city: "California, USA",
      jobTime: "Full time",
      amountPerMonth: 450,
      inBookmark: true,
    },
    {
      id: "2",
      sourceLogo: "../../../assets/images/jobs/job2.png",
      jobType: "Financial Planner",
      sourceName: "Twitter",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 400,
      inBookmark: false,
    },
    {
      id: "3",
      sourceLogo: "../../../assets/images/jobs/job3.png",
      jobType: "Product Manager",
      sourceName: "Microsoft Crop",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 550,
      inBookmark: false,
    },
    {
      id: "4",
      sourceLogo: "../../../assets/images/jobs/job4.png",
      jobType: "Automation Trester",
      sourceName: "Linkedin",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 550,
      inBookmark: true,
    },
  ];

  fieldsList = [
    "Todos",
    "Escritor",
    "Gestión",
    "Arte",
    "Marketing",
    "Programación",
    "Finanzas",
    "Contabilidad",
    "Diseñador de producto",
  ];

  jobTypeList = [
    "Todos",
    "Tiempo completo",
    "Tiempo parcial",
    "Freelance",
    "Prácticas",
    "Contratos",
  ];

  salaryTypesList = ["Todos los Rangos", "<$2k", "$2k - $4k", ">$6k"];

  showToast = false;
  toastMsg = '';
  selectedFieldIndex = 0;
  selectedJobTypeIndex = 0;
  selectedSalaryTypeIndex = 0;

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }
}
