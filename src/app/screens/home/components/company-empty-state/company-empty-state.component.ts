import { icNoFoundAsset } from '@/lib/constanst/assets';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-empty-state',
  templateUrl: './company-empty-state.component.html',
  styleUrls: ['./company-empty-state.component.scss'],
})
export class CompanyEmptyStateComponent implements OnInit {

  icNoFoundAsset = icNoFoundAsset;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit() { }

  onPublishNewOffer() {
    this.router.navigateByUrl('/bottom-tab-bar-company/newJobs');
  }

}
