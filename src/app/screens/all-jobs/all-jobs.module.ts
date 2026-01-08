import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllJobsPageRoutingModule } from './all-jobs-routing.module';

import { AllJobsPage } from './all-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllJobsPageRoutingModule,
    AllJobsPage
  ],
})
export class AllJobsPageModule {}
