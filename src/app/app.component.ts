import { Location, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { NavController, Platform, IonicModule } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from './service/api.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FirebaseMessagingService } from './firebase-messaging.service';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';


@Component({
  selector: 'app-root',
  standalone: true, // <-- ahora es standalone
  imports: [
    IonicModule,   // <-- necesario para <ion-router-outlet>, <ion-app>, etc.
    RouterModule,   // <-- necesario si usas rutas
    SidebarComponent,
    CommonModule
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
  tap = 0;

  constructor(
    private platform: Platform,
    public location: Location,
    private navCtrl: NavController,
    private router: Router,
    private apiService: ApiService,
    private fcmService: FirebaseMessagingService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.initPush()
    this.fcmService.listenMessages((payload) => {
      console.log('Mensaje recibido: ', payload);
    });
  }
  initPush() {
      LocalNotifications.requestPermissions().then(result => {
        if (result.display === 'granted') {
          PushNotifications.register();
        } else {
          console.log('Permiso de notificaciones denegado');
        }
      });

      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          PushNotifications.register();
        } else {
          console.log('Permiso de notificaciones denegado');
        }
      });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('FCM Token Android/iOS:', token.value);
      this.fcmService.setToken(token.value);
    });

    PushNotifications.addListener('pushNotificationReceived', async (notification) => {
      const state = await App.getState();
      if (!state.isActive) {
        await LocalNotifications.schedule({
          notifications: [
            {
              id: new Date().getTime(),
              title: notification.data?.title,
              body: notification.data?.body,
              extra: notification.data,
            }
          ]
        });
      }
    });


    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      App.getState().then(state => {
        if (!state.isActive) { // Solo si la app estaba en background o cerrada
          const data = notification.notification?.data;
          if (data?.action === 'open_login') {
            this.router.navigateByUrl('/auth/login');
          }
        }
      });
    });
  }

  async initializeApp() {
    try {
      await this.platform.ready();
      await SplashScreen.show({ showDuration: 500, autoHide: true });
      await StatusBar.setBackgroundColor({ color: '00000000' });

      const launch = await App.getLaunchUrl();
      if (launch?.url) {
        const success = this.parseDeepLink(launch.url);
        if (!success) {
          this.setupAppUrlOpenFallback();
        }
      } else {
        this.setupAppUrlOpenFallback();
      }

      this.setupBackButtonHandler();
    } catch (error) {
      console.error('Error al inicializar la app:', error);
    }
  }

  setupAppUrlOpenFallback() {
    App.addListener('appUrlOpen', (event: any) => {
      if (event?.url) {
        const success = this.parseDeepLink(event.url);
        if (!success) {
          this.router.navigateByUrl('/onboarding');
        }
      } else {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  private parseDeepLink(rawUrl: string): boolean {
    try {
      const url = new URL(rawUrl);
      const code = url.searchParams.get('code');
      if (code) {
        this.loginWithCode(code);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  loginWithCode(code: string) {
    this.router.navigateByUrl('/auth/login');
    this.apiService.postTokenByCode(code);
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
      const exitPaths = [
        '/bottom-tab-bar/home',
        '/bottom-tab-bar/saved',
        '/bottom-tab-bar/chats',
        '/bottom-tab-bar/profile',
        '/onboarding',
        '/auth/login',
      ];

      if (exitPaths.includes(path)) {
        this.tap++;
        if (this.tap === 2) App.exitApp();
        else setTimeout(() => (this.tap = 0), 2000);
      } else {
        this.navCtrl.back();
      }
    });
  }
}
