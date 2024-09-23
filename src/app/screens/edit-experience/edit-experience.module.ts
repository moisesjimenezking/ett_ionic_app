import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditExperiencePageRoutingModule } from './edit-experience-routing.module';

import { EditExperiencePage } from './edit-experience.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditExperiencePageRoutingModule
  ],
  declarations: [EditExperiencePage]
})
export class EditExperiencePageModule {}
