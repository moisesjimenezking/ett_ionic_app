import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEducationPage } from './edit-education.page';

const routes: Routes = [
  {
    path: '',
    component: EditEducationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEducationPageRoutingModule {}
