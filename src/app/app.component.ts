import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  tap = 0;

  constructor(
    private platform: Platform,
    public location: Location,
    private navCtrl: NavController,
    private router: Router,
    private apiService: ApiService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    try {
      await this.platform.ready();

      // Mostrar splash al iniciar
      await SplashScreen.show({ showDuration: 500, autoHide: true });
      await StatusBar.setBackgroundColor({ color: '00000000' });

      // Intentar obtener URL inicial
      const launch = await App.getLaunchUrl();
      if (launch?.url) {
        console.log('🚀 Deep link getLaunchUrl:');
        console.log(launch.url)
        const success = this.parseDeepLink(launch.url);
        if (!success) {
          this.setupAppUrlOpenFallback(); // fallback
        }
      } else {
        this.setupAppUrlOpenFallback(); // fallback
      }

      // Configurar botón back físico
      this.setupBackButtonHandler();

    } catch (error) {
      console.error('Error al inicializar la app:', error);
    }
  }

  setupAppUrlOpenFallback() {
    App.addListener('appUrlOpen', (event: any) => {
      console.log('🔁 Deep link appUrlOpen:');
      console.log(event?.url)
      if (event?.url) {
        const success = this.parseDeepLink(event.url);
        if (!success) {
          this.router.navigateByUrl('/onboarding');
        }
      } else {
        console.warn('⚠️ appUrlOpen sin url');
        this.router.navigateByUrl('/auth/login');
      }
    });
  }
  
  private parseDeepLink(rawUrl: string): boolean {
    try {
      const url = new URL(rawUrl);
      const path = url.pathname;
      const code = url.searchParams.get('code');
  
      console.log('📥 Ruta:');
      console.log(path)
      console.log('🔐 Código:');
      console.log(code)
  
      if (code) {
        this.loginWithCode(code);
        return true;
      } else {
        console.warn('⚠️ Deep link sin datos válidos');
        return false;
      }
  
    } catch (err) {
      console.error('❌ Error al parsear deep link');
      console.log(err)
      return false;
    }
  }

  loginWithCode(code: string) {
    this.router.navigateByUrl('/auth/login');
    this.apiService.postTokenByCode(code);
    // No navegas aquí porque postTokenByCode internamente navega tras éxito/fallo
  }

  get showSidebar() {
    const path = this.location.path();
    return !(
      path.endsWith('onboarding') ||
      path.endsWith('login') ||
      path.endsWith('register')
    );
  }

  setupBackButtonHandler() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      const path = this.location.path();

      const isExitPath = [
        '/bottom-tab-bar/home',
        '/bottom-tab-bar/saved',
        '/bottom-tab-bar/chats',
        '/bottom-tab-bar/profile',
        '/onboarding',
        '/auth/login',
      ].includes(path);

      if (isExitPath) {
        this.tap++;
        if (this.tap === 2) {
          App.exitApp();
        } else {
          setTimeout(() => (this.tap = 0), 2000);
        }
      } else {
        this.navCtrl.back();
      }
    });
  }
}
