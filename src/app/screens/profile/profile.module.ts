import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { SharedModule } from '@/shared/shared.module';
import { ApiService } from '@/service/api.service';
import { ProfilePage } from './profile.page';
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
