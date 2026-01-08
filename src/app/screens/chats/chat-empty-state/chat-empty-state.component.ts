import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-empty-state',
  templateUrl: './chat-empty-state.component.html',
  styleUrls: ['./chat-empty-state.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class ChatEmptyStateComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
