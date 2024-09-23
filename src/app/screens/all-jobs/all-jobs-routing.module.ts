import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllJobsPage } from './all-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: AllJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllJobsPageRoutingModule {}
