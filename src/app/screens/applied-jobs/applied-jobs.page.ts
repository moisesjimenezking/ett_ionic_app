import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.page.html',
  styleUrls: ['./applied-jobs.page.scss'],
})
export class AppliedJobsPage implements OnInit {

  selectedTabIndex = 0;

  appliedAllJobsList = [
    {
      id: "1",
      sourceLogo: "../../../assets/images/jobs/job1.png",
      jobType: "UI/UX Designer",
      sourceName: "Airbnb",
      city: "California, USA",
      jobTime: "Full time",
      amountPerMonth: 450,
      shortListed: true,
    },
    {
      id: "2",
      sourceLogo: "../../../assets/images/jobs/job2.png",
      jobType: "Financial Planner",
      sourceName: "Twitter",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 400,
      shortListed: false,
    },
    {
      id: "3",
      sourceLogo: "../../../assets/images/jobs/job3.png",
      jobType: "Product Manager",
      sourceName: "Microsoft Crop",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 550,
      shortListed: true,
    },
    {
      id: "4",
      sourceLogo: "../../../assets/images/jobs/job4.png",
      jobType: "Automation Trester",
      sourceName: "Linkedin",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 550,
      shortListed: true,
    },
    {
      id: "5",
      sourceLogo: "../../../assets/images/jobs/job1.png",
      jobType: "UI/UX Designer",
      sourceName: "Airbnb",
      city: "California, USA",
      jobTime: "Full time",
      amountPerMonth: 450,
      shortListed: true,
    },
    {
      id: "6",
      sourceLogo: "../../../assets/images/jobs/job2.png",
      jobType: "Financial Planner",
      sourceName: "Twitter",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 400,
      shortListed: false,
    },
    {
      id: "7",
      sourceLogo: "../../../assets/images/jobs/job3.png",
      jobType: "Product Manager",
      sourceName: "Microsoft Crop",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 550,
      shortListed: true,
    },
    {
      id: "8",
      sourceLogo: "../../../assets/images/jobs/job4.png",
      jobType: "Automation Trester",
      sourceName: "Linkedin",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 550,
      shortListed: true,
    },
  ];

  shortlistedJobsList = [
    {
      id: "1",
      sourceLogo: "../../../assets/images/jobs/job1.png",
      jobType: "UI/UX Designer",
      sourceName: "Airbnb",
      city: "California, USA",
      jobTime: "Full time",
      amountPerMonth: 450,
      shortListed: true,
    },
    {
      id: "4",
      sourceLogo: "../../../assets/images/jobs/job4.png",
      jobType: "Automation Trester",
      sourceName: "Linkedin",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 550,
      shortListed: true,
    },
    {
      id: "7",
      sourceLogo: "../../../assets/images/jobs/job3.png",
      jobType: "Product Manager",
      sourceName: "Microsoft Crop",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 550,
      shortListed: true,
    },
  ];

  interviewsJobList = [
    {
      id: "1",
      sourceLogo: "../../../assets/images/jobs/job4.png",
      jobType: "Automation Trester",
      sourceName: "Linkedin",
      city: "California, USA",
      jobTime: "Part time",
      amountPerMonth: 550,
      shortListed: true,
    },
    {
      id: "2",
      sourceLogo: "../../../assets/images/jobs/job1.png",
      jobType: "UI/UX Designer",
      sourceName: "Airbnb",
      city: "California, USA",
      jobTime: "Full time",
      amountPerMonth: 450,
      shortListed: true,
    },
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
}
