import { SocketService } from './socket.service';
import { ChatService } from './chat.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NotificationSoundService } from './notification-sound.service';


@Injectable({ providedIn: 'root' })
export class ChatRealtimeService {

  constructor(
    private socketService: SocketService,
    private chatService: ChatService,
    private router: Router,
    private soundService: NotificationSoundService,
  ) {}

  initListeners() {
    this.socketService.listen('newMessage', (data: { user_id: number }) => {
        const userId = Number(localStorage.getItem('user_id'))
        
        this.chatService.setHasUnread(true);
        if ( data.user_id !== userId ) {
            this.soundService.play();
        }
    });
  }
}
