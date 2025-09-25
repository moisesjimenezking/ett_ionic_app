import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeNotLoginPage } from './home-not-login.page';

const routes: Routes = [
  {
    path: '',
    component: HomeNotLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
