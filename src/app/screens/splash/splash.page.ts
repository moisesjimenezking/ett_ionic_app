import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,         
  imports: [IonicModule, CommonModule]
})
export class SplashPage implements AfterViewInit {

  constructor(private router: Router, private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.router.navigateByUrl('auth/login')
    }, 2000);
  }

  ionViewDidEnter() {
    this.routerOutlet.swipeGesture = false;
  }

  ionViewWillLeave() {
    this.routerOutlet.swipeGesture = true;
  }

}
