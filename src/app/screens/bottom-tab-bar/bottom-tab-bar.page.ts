import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-bottom-tab-bar',
  templateUrl: './bottom-tab-bar.page.html',
  styleUrls: ['./bottom-tab-bar.page.scss'],
})
export class BottomTabBarPage implements OnInit {

  constructor(
    private cdr: ChangeDetectorRef,
    private routerOutlet: IonRouterOutlet, 
    private platform: Platform
  ) { }

  ngOnInit() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  
  ionViewWillEnter() {
    this.cdr.detectChanges();
  }

  // ionViewDidEnter() {
  //   this.routerOutlet.swipeGesture = false;
  // }

  // ionViewWillLeave() {
  //   this.routerOutlet.swipeGesture = true;
  // }


}
