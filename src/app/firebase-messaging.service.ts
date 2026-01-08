import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseMessagingService {
  private messaging: Messaging;
  private token$ = new BehaviorSubject<string | null>(null);

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
    const stored = localStorage.getItem('fcm_code');
    if (stored) {
      this.token$.next(stored);
    }
  }

  // Solicita permiso y obtiene el token FCM
  async requestPermission(): Promise<string | null> {
    try {
      const token = await getToken(this.messaging, { vapidKey: 'BFE46WtpUIH8LVzmjabs0tBugoibRLvrfqd_lyYVw8MtLKJ4YntWp2PkLs6t1mglirY2RSgELJ0Zr_lXyF8JeS4' });
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Error obteniendo FCM token', error);
      return null;
    }
  }

  // Escucha mensajes cuando la app está en primer plano
  listenMessages(callback: (payload: any) => void) {
    onMessage(this.messaging, callback);
  }

    setToken(token: string) {
    localStorage.setItem('fcm_code', token);
    this.token$.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('fcm_code');
  }

  waitForToken(): Promise<string> {
    return new Promise(resolve => {
      const token = this.getToken();
      if (token) {
        resolve(token);
      } else {
        const sub = this.token$.subscribe(t => {
          if (t) {
            resolve(t);
            sub.unsubscribe();
          }
        });
      }
    });
  }
}
