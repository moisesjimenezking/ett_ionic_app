import { Component, OnInit, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ApiService } from '@/service/api.service';
import { UtilsLib } from '@/lib/utils';
import { IonModal } from '@ionic/angular/common';

export type AddSkillsEvent = {
  skills: any;
}

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss'],
})
export class AddSkillsComponent implements OnInit {
  @ViewChild('addSkillModal', { read: IonModal }) modal!: IonModal;

  @Output() onChange = new EventEmitter<AddSkillsEvent>();

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

  isSubmitting = false;

  utils = new UtilsLib();

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

  updateUser() {
    this.selectedSkills = this.recommendedList
      .filter(item => item.isSelected)
      .map(item => item.skill);

    const body: { [key: string]: any } = {};
    if (this.selectedSkills) {
      body["skills"] = this.selectedSkills
    }


    this.isSubmitting = true;
    setTimeout(() => {
      this.skillApi.putUser(body).subscribe({
        next: (data: any) => {

          this.currentSkill = data.skills;
          localStorage.setItem('skills', JSON.stringify(data.skills));
          this.isSubmitting = false;
          this.onChange.emit({ skills: data.skills });
          this.cdr.detectChanges();
          this.modal.dismiss();
        },
        error: () => {
          this.isSubmitting = false;
        }
      }
      );
    }, 1000);
  }

}
