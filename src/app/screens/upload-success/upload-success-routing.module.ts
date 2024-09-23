import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadSuccessPage } from './upload-success.page';

const routes: Routes = [
  {
    path: '',
    component: UploadSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadSuccessPageRoutingModule {}
