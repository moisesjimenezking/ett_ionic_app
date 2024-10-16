import { UtilsLib } from '@/lib/utils';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-item-loader',
  templateUrl: './file-item-loader.component.html',
  styleUrls: ['./file-item-loader.component.scss'],
})
export class FileItemLoaderComponent implements OnInit {

  @Input({ required: true }) filename!: string;
  @Input({ required: true }) base64!: string;
  @Output() onRemove = new EventEmitter();

  protected file?: File;
  protected isLoading = false;

  protected readonly utils = new UtilsLib();

  constructor() { }

  ngOnInit() {
    this.loadFile(this.base64);
  }


  loadFile(base64: string) {
    this.isLoading = true;
    this.utils.convertPDFBase64ToFile(base64, `${new Date().getTime()}.pdf`)
      .then((file) => {
        this.file = file;
        this.isLoading = false;
      }).catch(() => {
        this.isLoading = false;
      })
  }


}
