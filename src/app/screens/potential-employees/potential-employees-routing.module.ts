import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PotentialEmployeesPage } from './potential-employees.page';

const routes: Routes = [
  {
    path: '',
    component: PotentialEmployeesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PotentialEmployeesPageRoutingModule {}
