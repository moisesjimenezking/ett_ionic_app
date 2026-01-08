import { UtilsLib } from '@/lib/utils';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ImgComponent } from '../img/img.component';

@Component({
  selector: 'app-file-item-loader',
  templateUrl: './file-item-loader.component.html',
  styleUrls: ['./file-item-loader.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ImgComponent,
  ]
})
export class FileItemLoaderComponent implements OnInit {

  @Input({ required: true }) filename!: string;
  @Input({ required: true }) base64!: string;
  @Output() onRemove = new EventEmitter();

  protected isLoading = false;

  protected readonly utils = new UtilsLib();

  constructor() { }

  ngOnInit() {
  }




}
