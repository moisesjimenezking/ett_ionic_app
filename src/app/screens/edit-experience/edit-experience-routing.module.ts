import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditExperiencePage } from './edit-experience.page';

const routes: Routes = [
  {
    path: '',
    component: EditExperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditExperiencePageRoutingModule {}
