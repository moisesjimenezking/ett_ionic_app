import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-not-login-routing.module';
import { HomeNotLoginPage } from './home-not-login.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { SharedModule } from '../../shared/shared.module';
import { JobCardNotLoginComponent } from './components/job-card-not-login/job-card-not-login.component';
import { CompanyEmptyStateComponent } from './components/company-empty-state/company-empty-state.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  declarations: [HomeNotLoginPage, JobCardNotLoginComponent, CompanyEmptyStateComponent],
  providers: [ApiService]
})
export class HomePageNotLoginModule { }
