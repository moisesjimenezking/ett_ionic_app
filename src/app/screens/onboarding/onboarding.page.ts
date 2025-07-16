import { assetsPath, ettLogoAsset, smallBusinessAsset } from '@/lib/constanst/assets';
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

  @ViewChild('swiper') swiperRef!: ElementRef;

  swiperInstance: any;

  showMainImage = true;
  currentIndex = 0;

  ettLogoAsset = ettLogoAsset;
  smallBusinessAsset = smallBusinessAsset;

  onboardingScreenList = [
    {
      id: "1",
      onboardingImage: `${assetsPath}/images/person-working-1.png`,
      onboardingTitle: "Encuentra tu trabajo ideal",
      onboardingDescription: 'La primera plataforma pensada para profesionales en búsqueda de nuevas oportunidades laborales.',
    },
    {
      id: "2",
      onboardingImage: `${assetsPath}/images/woman-worker.png`,
      onboardingTitle: "Para todas las áreas laborales",
      onboardingDescription: 'Desarrolla tus habilidades y talentos al máximo con nuestras ofertas.',
    },
    {
      id: "3",
      onboardingImage: `${assetsPath}/images/friends-hanging-out.jpg`,
      onboardingTitle: "Pública tus ofertas con nosotros",
      onboardingDescription: 'Si eres dueño de una empresa y necesitas personal, nosotros tenemos los mejores.',
    },
  ];

  screenHeight = window.screen.height;



  constructor(private platform: Platform, private routerOutlet: IonRouterOutlet, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Espera que el componente esté renderizado para acceder a la instancia
    setTimeout(() => {
      this.swiperInstance = this.swiperRef?.nativeElement?.swiper;
      if (!this.swiperInstance) {
        console.warn("Swiper sigue sin estar listo después del timeout.");
      }
    }, 100); // puedes aumentar a 200 o 300 si sigue sin funcionar
  }

  continueToCarousel() {
    this.showMainImage = false;
    // Vuelve a esperar que el swiper esté listo, por si se carga después
    setTimeout(() => {
      this.swiperInstance = this.swiperRef?.nativeElement?.swiper;
    }, 200);
  }

  slideChangeCall() {
    if (this.swiperInstance) {
      this.currentIndex = this.swiperInstance.activeIndex;
    }
  }

  handleButtonPress() {
    if (this.currentIndex === 2) {
      this.router.navigateByUrl('/auth/login');
    } else if (this.swiperInstance) {
      const next = this.currentIndex === 0 ? 1 : 2;
      this.swiperInstance.slideTo(next);
    } else {
      console.warn("Swiper aún no está listo");
    }
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen)
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
