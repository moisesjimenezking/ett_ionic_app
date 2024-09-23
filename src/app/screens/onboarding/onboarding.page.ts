import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  currentIndex = 0;

  //! Toda la data mostrada en el
  dummyText =
    "Lorem ipsum dolor sit amet, consectetur adipiscingelit. Malesuada aliquet ut in ac cursus."; //todo: Este texto esta en latin

  onboardingScreenList = [
    {
      id: "1",
      onboardingImage: "../../../assets/images/onboarding/onboarding1.png",
      onboardingTitle: "Toma la oportunidad",  //todo: texto anterior -> "Grab The Opportunity", 
      onboardingDescription: this.dummyText,
    },
    {
      id: "2",
      onboardingImage: "../../../assets/images/onboarding/onboarding2.png",
      onboardingTitle: "Consigue el trabajo de tus sueños", //todo: texto anterior -> "Get your Dream Job",
      onboardingDescription: this.dummyText,
    },
    {
      id: "3",
      onboardingImage: "../../../assets/images/onboarding/onboarding3.png",
      onboardingTitle: "Una mejor manera de alcanzar el éxito", //todo: texto anterior -> "A Better way to Success",
      onboardingDescription: this.dummyText,
    },
  ];

  screenHeight = window.innerHeight;

  constructor(private platform: Platform, private routerOutlet: IonRouterOutlet, private router: Router) { }

  ngOnInit() {
  }

  slideChangeCall() {
    this.currentIndex = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen)
  }

  handleButtonPress() {
    if (this.currentIndex === 2) {
      this.router.navigateByUrl('/auth/login')
    }
    else {
      this.swiperRef?.nativeElement.swiper.slideTo(this.currentIndex == 0 ? 1 : 2);
    }
  }

  ionViewDidEnter() {
    this.routerOutlet.swipeGesture = false;
    StatusBar.setBackgroundColor({ color: '#0C2E5C' });
    StatusBar.setStyle({ style: Style.Dark });
  }

  ionViewWillLeave() {
    this.routerOutlet.swipeGesture = true;
    StatusBar.setBackgroundColor({ color: '#0f3460' });
    StatusBar.setStyle({ style: this.platform.is('ios') ? Style.Light : Style.Dark });
  }

}
