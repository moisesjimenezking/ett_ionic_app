import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.page.html',
  styleUrls: ['./edit-experience.page.scss'],
})
export class EditExperiencePage implements OnInit {

  presentTitle = 'Sr.UI/UX Designer (Team Lead)';
  presentCompanyName = 'Infosys Technologies';
  pastTitle = 'Jr.UI/UX Designer';
  pastCompanyName = 'Android';
  dateSelectionFor = '';

  presentStartDate: any;
  pastStartDate: any;
  showStartDateDialog = false;
  startDate: any;

  presentEndDate: any;
  pastEndDate: any;
  showEndDateDialog = false;
  endDate: any;

  todayDate = moment().utc().format('YYYY-MM-DD');

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    console.log(new Date(2023, 2, 20));
  }

  changeStartDate() {
    this.dateSelectionFor === 'present'
      ?
      this.presentStartDate = moment(this.startDate).utc().format('MMM YYYY')
      :
      this.pastStartDate = moment(this.startDate).utc().format('MMM YYYY')
  }

  changeEndDate(){
    this.dateSelectionFor === 'present'
      ?
      this.presentEndDate = moment(this.endDate).utc().format('MMM YYYY')
      :
      this.pastEndDate = moment(this.endDate).utc().format('MMM YYYY')
  }

  goBack() {
    this.navCtrl.back();
  }

}
