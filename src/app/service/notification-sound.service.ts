import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationSoundService {

  private audio = new Audio('assets/sounds/notification.mp3');

  constructor() {
    this.audio.load();
  }

  play() {
    // iOS requiere interacción previa del usuario
    this.audio.currentTime = 0;
    this.audio.play().catch(() => {
      // silencioso si el sistema bloquea autoplay
    });
  }
}
