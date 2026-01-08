import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppliedJobsPageRoutingModule } from './applied-jobs-routing.module';

import { AppliedJobsPage } from './applied-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppliedJobsPageRoutingModule,
    AppliedJobsPage
  ],
})
export class AppliedJobsPageModule {}
