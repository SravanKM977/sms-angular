import { Routes } from '@angular/router';
import { StudentList } from './pages/student-list/student-list';

export const routes: Routes = [
  {
    path: 'students',
    component: StudentList,
  },
  {
    path: 'students/add',
    component: StudentList,
  },
  {
    path: 'students/:id',
    component: StudentList,
  },
  {
    path: 'students/:id/edit',
    component: StudentList,
  },
];
