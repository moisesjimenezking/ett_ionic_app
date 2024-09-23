import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.page.html',
  styleUrls: ['./all-jobs.page.scss'],
})
export class AllJobsPage implements OnInit {
  limit = 1;
  page = 0;
  jobList: any;

  showToast = false;
  toastMsg = '';

  constructor(
    private navCtrl: NavController, 
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  allJobs(){
    const body = {
      limit: this.limit,
      page: this.page,
    };

    return this.apiService.allJobsApi(body)
  }

}
