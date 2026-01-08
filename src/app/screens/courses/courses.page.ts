import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonMenu, IonModal } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component'; // ajusta el path

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SidebarComponent
  ]
})
export class CoursesPage implements OnInit {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;
  @ViewChild('logoutDialogCourses', { read: IonModal }) logoutDialog!: IonModal;

  jobList = [
    {
      id: "1",
      sourceLogo: "../../../assets/images/courses/python.png",
      jobType: "Aprende Python desde cero",
      sourceName: "Platzi",
      amount : 30
    },
  ]
  showToast = false;
  toastMsg = '';
  
  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  closeMenu() {
    if (this.menu) {
      this.menu.close();
    }
  }

  logout() {
    this.closeMenu();
  }
}
