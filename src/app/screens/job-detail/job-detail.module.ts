import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IonicModule } from '@ionic/angular';

import { JobDetailPageRoutingModule } from './job-detail-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JobDetailPage } from './job-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobDetailPageRoutingModule,
    HttpClientModule
  ],
  declarations: [JobDetailPage],
  providers: [ApiService]
})
export class JobDetailPageModule {}
