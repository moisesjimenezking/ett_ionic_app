import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { ApiService } from '../../service/api.service';


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
  newMsg='';

  constructor(
    private navCtrl: NavController, 
    private router: Router,
    private apiMessage: ApiService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.userMessages = this.details("messages")
    this.dataChat = this.details("all")
    this.viewsAll()
  }

  details(text: string){
    const storedItemString = localStorage.getItem('messages');
    if (storedItemString) {
      if (text === "messages"){
        return JSON.parse(storedItemString)["messages"];
      }else{
        return JSON.parse(storedItemString);
      }
      
    }else{
      return {};
    }
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  stablishUrlPic (current: any){
    let iconItem = current; 
    let value = (iconItem === null || iconItem === '' || iconItem === 'null') ? `${localStorage.getItem('rute')}/img/iconHuman.jpg` : `${localStorage.getItem('rute')}/img/${iconItem}`;

    return value
  }

  searchIcon(item: any): string{
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

  viewsAll(){
    const body = {
      chats_id : this.dataChat.id,
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
        message : this.newMsg,
        chats_id : this.dataChat.id,
      }

      this.newMsg = '';
      
      setTimeout(() => {
        this.apiMessage.postMessage(body).subscribe((data: any) => {
          this.userMessages.push(data);    
          this.cdr.detectChanges();
        });
      }, 50);  
    }
  }

}
