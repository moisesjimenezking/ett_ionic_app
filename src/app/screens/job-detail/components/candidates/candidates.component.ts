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


  constructor() { }

  ngOnInit() { }

  goToDetails(candidate: CandidateModel) {
    this.onSeeDetails.emit(candidate);
  }

  stablishUrlPic(current: any) {
    let iconItem = current;
    let value = (iconItem === null || iconItem === '' || iconItem === 'null') ? `${localStorage.getItem('rute')}/img/iconHuman.jpg` : `${localStorage.getItem('rute')}/img/${iconItem}`;

    return value
  }

}
