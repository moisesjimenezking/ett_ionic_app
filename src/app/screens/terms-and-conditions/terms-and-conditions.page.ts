import { Component } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
  standalone: true,                // ✅ marca como standalone
  imports: [IonicModule, CommonModule] // ✅ importa IonicModule para usar ion-header, ion-content, etc.
})
export class TermsAndConditionsPage {

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

  goBack() {
    this.navCtrl.back();
  }
}
