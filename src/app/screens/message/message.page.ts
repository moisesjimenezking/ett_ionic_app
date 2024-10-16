import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, NavController, MenuController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { UtilsLib } from 'src/app/lib/utils';
import { Message } from '@/types';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('textArea') textArea: any;
  @ViewChild(IonContent) content: IonContent | undefined;


  userMessages: any;
  dataChat: any;

  newMsgRegister: object = {};
  newMsg = '';

  isSending = false;
  messageSending = '';
  isWritting = false;

  protected readonly utils = new UtilsLib();

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private apiMessage: ApiService,
    private cdr: ChangeDetectorRef,
    private menu: MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userMessages = this.details("messages");

    this.dataChat = this.details("all");

    this.viewsAll();
  }

  details(text: string) {
    const storedItemString = localStorage.getItem('messages');
    if (storedItemString) {
      if (text === "messages") {
        return JSON.parse(storedItemString)["messages"];
      } else {
        return JSON.parse(storedItemString);
      }

    } else {
      return {};
    }
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  trackMessagesIndex(_: number, item: Message) {
    return item.id;
  }

  async openMenu() {
    await this.menu.open('app-menu')
  }

  stablishUrlPic(url: string | null) {
    return this.utils.stablishUrlPic(url);
  }


  searchIcon(item: any): string {
    let newIcon = this.stablishUrlPic(item)
    return newIcon;
  }

  private scrollToBottom(): void {
    this.scrollContainer.nativeElement.scroll({
      top: this.scrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  viewsAll() {
    const body = {
      chats_id: this.dataChat.id,
    }

    this.apiMessage.putViewsAll(body)
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  backspace() {
    this.goTo(localStorage.getItem('accountType') === "PERSON"
      ? 'bottom-tab-bar/chats'
      : 'bottom-tab-bar-company/chats'
    );
  }

  addMessage() {
    if (this.newMsg) {
      const body = {
        message: this.newMsg,
        chats_id: this.dataChat.id,
      }

      this.messageSending = this.newMsg;
      setTimeout(() => {
        this.scrollToBottom();
      }, 300);
      this.newMsg = '';
      this.isSending = true
      this.apiMessage.postMessage(body).subscribe({
        next: (data: any) => {
          this.isSending = false;
          this.userMessages.push(data);
          setTimeout(() => {
            this.scrollToBottom();
          }, 300);
          this.getAllMessages();
        },
        error: () => {
          this.isSending = false;
        }
      });
    }
  }

  getAllMessages() {
    this.isWritting = true;
    this.apiMessage.getChat({}).subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          const messages = data.find(d => d.id == this.dataChat.id);
          this.userMessages = messages!.messages;
          localStorage.setItem('messages', JSON.stringify(messages))
        } else if (data?.id == this.dataChat.id) {
          this.userMessages = data.messages;
          localStorage.setItem('messages', JSON.stringify(data))
        }
        setTimeout(() => {
          this.scrollToBottom();
        }, 300);
        this.messageSending = '';
        this.isWritting = false;
      },
      error: (_) => {
        this.messageSending = '';
        this.isWritting = false;
      }
    });
  }

}
