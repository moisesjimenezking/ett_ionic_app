import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { SharedModule } from '../../shared/shared.module';
import { JobCardComponent } from './components/job-card/job-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  declarations: [HomePage, JobCardComponent],
  providers: [ApiService]
})
export class HomePageModule { }
