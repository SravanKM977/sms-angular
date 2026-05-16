import { Component } from '@angular/core';
import { Sidebar } from '../../core/components/sidebar/sidebar';
import { Header } from '../../core/components/header/header';
import { Footer } from '../../core/components/footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, Header, Footer, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}
