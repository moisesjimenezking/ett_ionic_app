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
        loadChildren: () => import('../../screens/home/home.module').then(m => m.HomePageModule),
        data: { noCache: true }
      },
      {
        path: 'saved',
        loadChildren: () => import('../../screens/saved/saved.module').then(m => m.SavedPageModule),
        data: { noCache: true }
      },
      {
        path: 'chats',
        loadChildren: () => import('../../screens/chats/chats.module').then(m => m.ChatsPageModule),
        data: { noCache: true }
      },
      {
        path: 'profile',
        loadChildren: () => import('../../screens/profile/profile.module').then(m => m.ProfilePageModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('../../screens/courses/courses.module').then(m => m.CoursesPageModule),
        data: { noCache: true }
      },
      {
        path: 'job-detail',
        loadChildren: () => import('../../screens/job-detail/job-detail.module').then(m => m.JobDetailPageModule),
        data: { noCache: true }
      },
      {
        path: 'wallet',
        loadChildren: () => import('../../screens/wallet/wallet.module').then(m => m.WalletPageModule),
        data: { noCache: true }
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
