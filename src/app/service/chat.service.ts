import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // así Angular lo hace singleton global
})
export class ChatService {
  private refreshChatsSource = new Subject<void>();
  refreshChats$ = this.refreshChatsSource.asObservable();

  // Llamar a esto para notificar que la lista de chats debe refrescar
  triggerRefreshChats() {
    this.refreshChatsSource.next();
  }

  // true = mostrar burbuja roja en el tab
  private hasUnreadMessagesSource = new BehaviorSubject<boolean>(false);
  hasUnreadMessages$ = this.hasUnreadMessagesSource.asObservable();

  setHasUnread(value: boolean) {
    this.hasUnreadMessagesSource.next(value);
  }

  clearUnread() {
    this.hasUnreadMessagesSource.next(false);
  }
}
