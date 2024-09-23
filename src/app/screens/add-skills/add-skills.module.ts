import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IonicModule } from '@ionic/angular';
import { AddSkillsPageRoutingModule } from './add-skills-routing.module';
import { AddSkillsPage } from './add-skills.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSkillsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AddSkillsPage],
  providers: [ApiService]
})
export class AddSkillsPageModule {}
