import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/components/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '*',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    // loadChildren: () => import('./features/dashboard/dashboard.module').then(m = > m.DashboardModule)
  },
  // {
  //   path: 'students',
  // },
  // {
  //   path: 'teachers',
  // },
  // {
  //   path: 'classes',
  // },
  // {
  //   path: 'subjects',
  // },
];
