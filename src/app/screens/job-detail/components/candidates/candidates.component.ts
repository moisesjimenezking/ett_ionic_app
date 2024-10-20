import { icPersonAsset } from '@/lib/constanst/assets';
import { UtilsLib } from '@/lib/utils';
import { CandidateModel } from '@/types';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  @Input({ required: true }) candidates!: CandidateModel[];
  @Output() onSeeDetails = new EventEmitter<CandidateModel>();

  icPersonAsset = icPersonAsset;


  protected readonly utils = new UtilsLib();

  constructor() { }

  ngOnInit() { }

  goToDetails(candidate: CandidateModel) {
    this.onSeeDetails.emit(candidate);
  }


  stablishUrlPic(url: string | null) {
    return this.utils.stablishUrlPic(url);
  }

}
