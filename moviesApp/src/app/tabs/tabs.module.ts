import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'search',
        loadChildren: () => import('../pages/search/search.module')
          .then(m => m.SearchPageModule)
      },
      {
        path: 'watchlist',
        loadChildren: () => import('../pages/watchlist/watchlist.module')
          .then(m => m.WatchlistPageModule)
      },
      {
        path: 'watched',
        loadChildren: () => import('../pages/watched/watched.module')
          .then(m => m.WatchedPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module')
          .then(m => m.ProfilePageModule)
      },
      {
        path: 'details',
        loadChildren: () => import('../pages/details/details.module')
          .then(m => m.DetailsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/search',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}