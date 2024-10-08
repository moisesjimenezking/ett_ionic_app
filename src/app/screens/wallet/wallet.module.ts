import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WalletPageRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.page';
import { ApiService } from '../../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [WalletPage],
  providers: [ApiService]
})
export class WalletPageModule { }
