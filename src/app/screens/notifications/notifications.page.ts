import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SwipeItemComponent } from '../../components/swipe-item/swipe-item.component'; // Ajusta la ruta


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, SwipeItemComponent]
})
export class NotificationsPage implements OnInit {

  notificationsList: any = [
    {
      id: "1",
      title: "Recomendación de nuevos empleos para ti.",
      description:
        "Lorem ipsum dolor sit amet, consectetur dipiscing elit. In pulvinar commodo",
    },
    {
      id: "2",
      title: "Carta de oferta de Airbnb",
      description:
        "Nemo enim ipsam voluptatem quia voluptassit aspernatur aut odit aut fugit, sed quia.",
    },
    // {
    //   id: "3",
    //   title: "Job offer from Infosys Technologies",
    //   description:
    //     "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nu.",
    // },
    // {
    //   id: "4",
    //   title: "New jobs recommendation for you",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur dipiscing elit. In pulvinar commodo",
    // },
  ];

  isToastOpen = false;

  constructor(private navCtrl: NavController, private changeDetector: ChangeDetectorRef, private tostCtrl: ToastController) { }

  ngOnInit() {
  }

  removeNotification(id: any) {
    const copyList = this.notificationsList;
    const newList = copyList.filter((item: any) => item.id !== id);
    this.notificationsList = newList;
    this.isToastOpen = true;
    this.tostCtrl.getTop();
    this.changeDetector.detectChanges();
  }

  goBack() {
    this.navCtrl.back();
  }

}
