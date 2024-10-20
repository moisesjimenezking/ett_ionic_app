import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

import { fadeIn } from '@/lib/animations/custom-animations';
import { UtilsLib } from '@/lib/utils';
import { icPersonAsset } from '@/lib/constanst/assets';

@Component({
  selector: 'ng-image',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class ImgComponent implements OnInit {
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
