import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { HttpClientModule } from '@angular/common/http';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditAboutComponent } from './components/edit-about/edit-about.component';
import { AddSkillsComponent } from './components/add-skills/add-skills.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [ProfilePage, EditProfileComponent, EditAboutComponent, AddSkillsComponent],
  providers: [ApiService]
})
export class ProfilePageModule { }
