import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { application } from '../../../../constants/app.constants';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(public router: Router) {}

  navItems = [
    {
      name: `${application.paths.dashboard}`,
      image: '',
      path: `${application.paths.dashboard}`,
    },
    {
      name: `${application.paths.students}`,
      image: '',
      path: `${application.paths.students}`,
    },
    {
      name: `${application.paths.teachers}`,
      image: '',
      path: `${application.paths.teachers}`,
    },
    {
      name: `${application.paths.classes}`,
      image: '',
      path: `${application.paths.classes}`,
    },
    {
      name: `${application.paths.subjects}`,
      image: '',
      path: `${application.paths.subjects}`,
    },
  ];
}
