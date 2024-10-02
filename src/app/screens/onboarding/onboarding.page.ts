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

  showMainImage = true;
  currentIndex = 0;

  onboardingScreenList = [
    {
      id: "1",
      onboardingImage: "../../../assets/images/person-working-1.png",
      onboardingTitle: "Encuentra tu trabajo ideal",
      onboardingDescription: 'La primera plataforma pensada para profesionales en búsqueda de nuevas oportunidaes laborales.',
    },
    {
      id: "2",
      onboardingImage: "../../../assets/images/woman-worker.png",
      onboardingTitle: "Para todas las áreas laborales",
      onboardingDescription: 'Desarrolla tus habilidades y talentos al máximo con nuestras ofertas.',
    },
    {
      id: "3",
      onboardingImage: "../../../assets/images/woman-worker-2.png",
      onboardingTitle: "Pública tus ofertas con nosotros",
      onboardingDescription: 'Si eres dueño de una empresa y necesitas personal, nosotros tenemos los mejores.',
    },
  ];

  screenHeight = window.innerHeight;

  constructor(private platform: Platform, private routerOutlet: IonRouterOutlet, private router: Router) { }

  ngOnInit() {
  }

  continueToCarousel() {
    this.showMainImage = false;
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
