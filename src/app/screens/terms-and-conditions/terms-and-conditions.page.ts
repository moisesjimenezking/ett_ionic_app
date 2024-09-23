import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
})
export class TermsAndConditionsPage implements OnInit {

  termsOfUseList = [
    "Lorem ipsum dolor sit amet, consectetur adipiscingelit. Semper quis non, convallis leo sit. Dui ac at consectetur risus phasellus consectetur at elementum placerat.",
    "Sapien diam ac elementum auctor. Sed ut at diam miin viverra. Curabitur dui morbi phasellus nec adipiscinorci ultrices dignissim. Dictum nulla viverra fermentuvel. Accumsan consequat sapien semper tellus nulla tellus cras volutpat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscingelit. Semper quis non, convallis leo sit.",
  ];

  companyPoliciesList = [
    "Lorem ipsum dolor sit amet, consectetur adipiscingelit. Semper quis non, convallis leo sit. Dui ac at consectetur risus phasellus consectetur at elementum placerat.",
    "Sapien diam ac elementum auctor. Sed ut at diam miin viverra. Curabitur dui morbi phasellus nec adipiscinorci ultrices dignissim. Dictum nulla viverra fermentuvel. Accumsan consequat sapien semper tellus nulla tellus cras volutpat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscingelit. Semper quis non, convallis leo sit.",
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

}
