import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WalletPageRoutingModule } from './wallet-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { ApiService } from '../../service/api.service';

// Importa el standalone component
import { WalletPage } from './wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule,
    HttpClientModule,
    SharedModule,
    WalletPage
  ],
  providers: [ApiService]
})
export class WalletPageModule { }
