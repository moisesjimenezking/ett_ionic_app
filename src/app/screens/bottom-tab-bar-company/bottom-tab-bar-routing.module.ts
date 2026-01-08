import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BottomTabBarPage } from './bottom-tab-bar.page';

const routes: Routes = [
  {
    path: '',
    component: BottomTabBarPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('../chats/chats.module').then(m => m.ChatsPageModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('../courses/courses.module').then(m => m.CoursesPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'newJobs',
        loadChildren: () => import('../new-jobs/new-jobs.module').then(m => m.NewJobsPageModule)
      },
      {
        path: 'job-detail',
        loadChildren: () => import('../job-detail/job-detail.module').then(m => m.JobDetailPageModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('../../screens/wallet/wallet.module').then(m => m.WalletPageModule),
        data: { noCache: true }
      },
      {
        path: 'potential-employees',
        loadChildren: () => import('../../screens/potential-employees/potential-employees.module').then( m => m.PotentialEmployeesPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BottomTabBarPageRoutingModule { }
