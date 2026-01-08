import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, NavController, MenuController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { SocketService } from '../../service/socket.service';
import { UtilsLib } from 'src/app/lib/utils';
import { Message } from '@/types';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  // @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('textArea') textArea: any;
  @ViewChild(IonContent, { static: false }) content!: IonContent;


  userMessages: any;
  dataChat: any;

  newMsgRegister: object = {};
  newMsg = '';
  idChat = '';
  nameRecept = '';
  isSending = false;
  messageSending = '';
  isWritting = false;

  protected readonly utils = new UtilsLib();

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private apiMessage: ApiService,
    private cdr: ChangeDetectorRef,
    private menu: MenuController,
    private socketService: SocketService,
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {
    this.socketService.listen('newMessage', (data: { datetime_update: any; view: number; isSender: boolean; id: number; chats_id: number; message: string; user_id: number; datetime: string; }) => {
      this.handleNewMessage(data);
    });
  }

  ionViewWillEnter() {
    this.getAllMessages();
    this.userMessages = this.details("messages");

    this.dataChat = this.details("all");

    this.route.queryParams.subscribe(params => {
      if(params['chatId']){
        this.idChat = params['chatId'];
        this.nameRecept = params['name'];
      }
    });
    this.viewsAll();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 500); 
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


  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }

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

  private async scrollToBottom(): Promise<void> {
    if (this.content) {
      await this.content.scrollToBottom(300);
    }
  }

  async goBack() {
    this.navCtrl.back()
  }

  viewsAll() {
    let chatId = this.idChat !== '' ? this.idChat : this.dataChat.id;
    const body = {
      chats_id: chatId,
    }

    this.apiMessage.putViewsAll(body)
  }

  goTo(screen: any) {
    this.router.navigateByUrl(screen);
  }

  backspace() {
    this.goBack();
  }

  handleNewMessage(data: { datetime_update: any; view: number; isSender: boolean; id: number; chats_id: number; message: string; user_id: number; datetime: string; }) {
    if (data.chats_id === this.dataChat.id || data.chats_id === Number(this.idChat)) { // ✅ Solo actualiza si el mensaje es del chat actual
      const newMsg: Message = data
      if (!Array.isArray(this.userMessages)) {
        this.userMessages = [];
      }

      const messageExists = this.userMessages.some((msg: Message) => msg.id === newMsg.id);

      console.log(messageExists)
      if (!messageExists) {
        const user_id = localStorage.getItem('user_id')

        if (user_id !== null && user_id !== "" && parseInt(user_id) === data.user_id) {
          newMsg.isSender = true;
        }else{
          newMsg.isSender = false;
        }

        this.userMessages.push(newMsg); // 🔥 Agregar mensaje a la lista
        // this.cdr.detectChanges(); // 🔄 Forzar actualización de la vista
        setTimeout(() => {
          this.scrollToBottom();
        }, 300);
      }
    }
  }
  

  addMessage() {
    if (this.newMsg) {
      let chatId = this.idChat !== '' ? this.idChat : this.dataChat.id;
      const body = {
        message: this.newMsg,
        chats_id: chatId,
      }

      this.messageSending = this.newMsg;
      this.newMsg = '';
      this.isSending = true
      this.apiMessage.postMessage(body).subscribe({
        next: (data: any) => {
          this.isSending = false;
          // this.userMessages.push(data);
          
        },
        error: () => {
          this.isSending = false;
           // ��� Forzar actualización de la vista
        },
        complete: () => {
          this.isSending = false;
           // ��� Forzar actualización de la vista
        }
      });
    }
  }

  getAllMessages() {
    this.isWritting = true;
    this.apiMessage.getChat({}).subscribe({
      next: (data) => {
        try {
          const messages = Array.isArray(data) ? data.find(d => d.id == this.dataChat.id) : data;
          if (messages && messages.messages) {
            this.userMessages = messages.messages;
            localStorage.setItem('messages', JSON.stringify(messages));
          }
          this.messageSending = '';
          this.isWritting = false;
          this.cdr.detectChanges(); // 🔄 Forzar actualización de la vista
        } catch (error) {
          this.messageSending = '';
          this.isWritting = false;
          this.cdr.detectChanges(); // 🔄 Forzar actualización de la vista
          console.error('Error procesando los mensajes:', error);
        }
      },
      error: (err) => {
        this.messageSending = '';
        this.isWritting = false;
        this.cdr.detectChanges(); // 🔄 Forzar actualización de la vista
        console.error('Error en la API:', err);
      },
      complete: () => {
        this.messageSending = '';
        this.isWritting = false;
        this.cdr.detectChanges(); // 🔄 Forzar actualización de la vista
      }
    });
  }
  

}
