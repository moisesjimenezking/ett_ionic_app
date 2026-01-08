import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { NewJobsPageRoutingModule } from './new-jobs-routing.module';

import { NewJobsPage } from './new-jobs.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewJobsPageRoutingModule,
    HttpClientModule,
    SharedModule,
    NewJobsPage
  ],
  providers: [ApiService]
})
export class NewJobsPageModule { }
