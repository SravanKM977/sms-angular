import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: '*',
    redirectTo: 'admin',
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-home/dashboard-home').then(
            (m) => m.DashboardHome
          ),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./features/students/pages/student-list/student-list').then((m) => m.StudentList),
      },
      {
        path: 'teachers',
        loadComponent: () =>
          import('./features/teachers/pages/teacher-list/teacher-list').then((m) => m.TeacherList),
      },
      {
        path: 'classes',
        loadComponent: () =>
          import('./features/classes/pages/class-list/class-list').then((m) => m.ClassList),
      },
      {
        path: 'subjects',
        loadComponent: () =>
          import('./features/subjects/pages/subject-list/subject-list').then((m) => m.SubjectList),
      },
    ],
  },
];
