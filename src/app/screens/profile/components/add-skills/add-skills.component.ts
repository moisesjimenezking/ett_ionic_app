import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
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
export class AddSkillsComponent implements OnInit, AfterViewInit {

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

  skill = '';
  currentSkill: string[] = [];

  isSubmitting = false;

  protected readonly utils = new UtilsLib();

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private skillApi: ApiService,
  ) { }

  ngOnInit() {
    const listCurrentSkill = localStorage.getItem('skills');
    if (listCurrentSkill) {
      this.currentSkill = JSON.parse(listCurrentSkill);
    }
  }

  ngAfterViewInit(): void {
  }

  goBack() {
    this.navCtrl.back();
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  addSkill() {
    this.currentSkill.push(this.skill);
    this.skill = '';
  }

  removeSkill(position: number) {
    this.currentSkill = this.currentSkill.filter((_, index) => index != position);
  }

  updateUser(modal: IonModal) {

    const body: { [key: string]: any } = {};

    if (this.skill.length) {
      this.currentSkill.push(this.skill);
      this.skill = '';
    }

    body["skills"] = this.currentSkill;


    this.isSubmitting = true;

    this.skillApi.putUser(body).subscribe({
      next: (data: any) => {
        this.currentSkill = data.skills;
        localStorage.setItem('skills', JSON.stringify(data.skills));
        this.isSubmitting = false;
        this.onChange.emit({ skills: data.skills });
        modal?.dismiss();
      },
      error: () => {
        this.isSubmitting = false;
      }
    }
    );
  }

}
