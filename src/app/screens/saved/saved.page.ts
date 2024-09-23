import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, NavController } from '@ionic/angular';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {

  savedList: any = [
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
  isToastOpen = false;

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  onDelete(id: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.savedList = this.savedList.filter((item: any) => item.id !== id);
    this.isToastOpen = true;
  }

}
