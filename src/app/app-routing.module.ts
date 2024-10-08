import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { authGuard } from './lib/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./screens/profile/profile.module').then(m => m.ProfilePageModule),
  },
  {
    path: 'chats',
    loadChildren: () => import('./screens/chats/chats.module').then(m => m.ChatsPageModule),
    data: { noCache: true }
  },
  {
    path: 'splash',
    loadChildren: () => import('./screens/splash/splash.module').then(m => m.SplashPageModule),
    data: { noCache: true }
  },
  {
    path: 'bottom-tab-bar',
    loadChildren: () => import('./screens/bottom-tab-bar/bottom-tab-bar.module').then(m => m.BottomTabBarPageModule),
    data: { noCache: true }
  },
  {
    path: 'bottom-tab-bar-company',
    loadChildren: () => import('./screens/bottom-tab-bar-company/bottom-tab-bar.module').then(m => m.BottomTabBarPageModule),
    data: { noCache: true }
  },
  {
    path: 'search',
    loadChildren: () => import('./screens/search/search.module').then(m => m.SearchPageModule),
    data: { noCache: true }
  },
  {
    path: 'all-jobs',
    loadChildren: () => import('./screens/all-jobs/all-jobs.module').then(m => m.AllJobsPageModule),
    data: { noCache: true }
  },
  {
    path: 'job-detail',
    loadChildren: () => import('./screens/job-detail/job-detail.module').then(m => m.JobDetailPageModule),
    data: { noCache: true }
  },
  {
    path: 'upload-success',
    loadChildren: () => import('./screens/upload-success/upload-success.module').then(m => m.UploadSuccessPageModule),
    data: { noCache: true }
  },
  {
    path: 'message',
    loadChildren: () => import('./screens/message/message.module').then(m => m.MessagePageModule),
    data: { noCache: true }
  },
  {
    path: 'edit-contact',
    loadChildren: () => import('./screens/edit-contact/edit-contact.module').then(m => m.EditContactPageModule),
    data: { noCache: true }
  },
  {
    path: 'edit-about',
    loadChildren: () => import('./screens/edit-about/edit-about.module').then(m => m.EditAboutPageModule),
    data: { noCache: true }
  },
  {
    path: 'add-skills',
    loadChildren: () => import('./screens/add-skills/add-skills.module').then(m => m.AddSkillsPageModule),
    data: { noCache: true }
  },
  {
    path: 'edit-experience',
    loadChildren: () => import('./screens/edit-experience/edit-experience.module').then(m => m.EditExperiencePageModule),
    data: { noCache: true }
  },
  {
    path: 'edit-education',
    loadChildren: () => import('./screens/edit-education/edit-education.module').then(m => m.EditEducationPageModule),
    data: { noCache: true }
  },
  {
    path: 'settings',
    loadChildren: () => import('./screens/settings/settings.module').then(m => m.SettingsPageModule),
    data: { noCache: true }
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./screens/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule),
    data: { noCache: true }
  },
  {
    path: 'notifications',
    loadChildren: () => import('./screens/notifications/notifications.module').then(m => m.NotificationsPageModule),
    data: { noCache: true }
  },
  {
    path: 'applied-jobs',
    loadChildren: () => import('./screens/applied-jobs/applied-jobs.module').then(m => m.AppliedJobsPageModule),
    data: { noCache: true }
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./screens/contact-us/contact-us.module').then(m => m.ContactUsPageModule),
    data: { noCache: true }
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./screens/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsPageModule),
    data: { noCache: true }
  },
  {
    path: 'onboarding',
    canActivate: [authGuard],
    loadChildren: () => import('./screens/onboarding/onboarding.module').then(m => m.OnboardingPageModule),
    data: { noCache: true }
  },
  {
    path: 'auth',
    canActivate: [authGuard],
    loadChildren: () => import('./screens/auth/auth.module').then(m => m.AuthPageModule),
    data: { noCache: true }
  },
  {
    path: 'courses',
    loadChildren: () => import('./screens/courses/courses.module').then(m => m.CoursesPageModule),
    data: { noCache: true }
  },
  {
    path: 'courses-detail',
    loadChildren: () => import('./screens/courses-detail/courses-detail.module').then(m => m.CoursesDetailPageModule),
    data: { noCache: true }
  },
  {
    path: 'new-jobs',
    loadChildren: () => import('./screens/new-jobs/new-jobs.module').then(m => m.NewJobsPageModule)
  },
  {
    path: 'new-jobs',
    loadChildren: () => import('./screens/new-jobs/new-jobs.module').then(m => m.NewJobsPageModule)
  },
  {
    path: 'candidate',
    loadChildren: () => import('./screens/candidate/candidate.module').then(m => m.CandidatePageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./screens/wallet/wallet.module').then(m => m.WalletPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
