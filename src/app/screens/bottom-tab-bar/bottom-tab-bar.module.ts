import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BottomTabBarPageRoutingModule } from './bottom-tab-bar-routing.module';

import { BottomTabBarPage } from './bottom-tab-bar.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BottomTabBarPageRoutingModule,
    SharedModule
  ],
  declarations: [BottomTabBarPage]
})
export class BottomTabBarPageModule { }
