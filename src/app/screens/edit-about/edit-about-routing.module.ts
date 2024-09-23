import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAboutPage } from './edit-about.page';

const routes: Routes = [
  {
    path: '',
    component: EditAboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAboutPageRoutingModule {}
