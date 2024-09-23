import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.page.html',
  styleUrls: ['./add-skills.page.scss'],
})
export class AddSkillsPage implements OnInit {

  listSkillsRecommended = [
    "FreeBSD",
    "IBM OS",
    "JavaOS",
    "Linux",
    "Mac OS",
    "NetBSD",
    "NT 4.0",
    "Solaris"
  ];

  currentSkill: string[] = [];

  recommendedList: any[] = [];

  newWebsite: string = '';
  websitesList: string[] = [];
  selectedSkills: string[] = [];

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private skillApi: ApiService,
  ) { }

  ngOnInit() {
    let listCurrentSkill = localStorage.getItem('skills');
    if (listCurrentSkill) {
      this.currentSkill = JSON.parse(listCurrentSkill);
    }

    this.recommendedList = this.listSkillsRecommended.map((skill, index) => {
      return {
        id: index,
        skill: skill,
        isSelected: this.currentSkill.includes(skill)
      };
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  updateUser(){
    this.selectedSkills = this.recommendedList
      .filter(item => item.isSelected)
      .map(item => item.skill);

    const body: { [key: string]: any } = {};
    if(this.selectedSkills){
      body["skills"] = this.selectedSkills
    }


    setTimeout(() => {
      this.skillApi.putUser(body).subscribe((data: any) => {
        this.currentSkill = data.skills;
        localStorage.setItem('skills',  JSON.stringify(data.skills));
        
        this.cdr.detectChanges();
        this.goTo(localStorage.getItem('accountType') === "PERSON" 
          ? 'bottom-tab-bar/profile' 
          : 'bottom-tab-bar-company/profile'
        );
      });
    }, 1000);     
  }

}
