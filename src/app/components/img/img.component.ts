import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { fadeIn } from '@/lib/animations/custom-animations';
import { UtilsLib } from '@/lib/utils';
import { icPersonAsset } from '@/lib/constanst/assets';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-image',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class ImgComponent implements OnInit, OnChanges {
  @Input() src = '';
  @Input() loadBackground = 'bg-muted';
  @Input() fallbackErrorSrc = '';
  @Input() width: string | number = '80';
  @Input() height: string | number = '200px';
  @Input() heightAfterLoaded?: string | number;
  @Input() alt = '';
  @Input('class') className: string = '';


  isLoad = false;
  isError = false;


  protected readonly utils = new UtilsLib();

  constructor(private readonly el: ElementRef,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.el.nativeElement.classList.add('position-relatie');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.isError = false;
      this.isLoad = false;
    }
  }

  getBgAnimated() {
    return `${this.loadBackground} animate-pulse`;
  }

  load(_: any) {
    // this.isLoad = true;
  }

  loaded(_: any) {
    this.isLoad = true;
    this.cdr.detectChanges();
  }

  error(_: any) {
    this.isError = true;
    this.cdr.detectChanges();
  }

}
