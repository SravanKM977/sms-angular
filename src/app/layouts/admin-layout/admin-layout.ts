import { Component } from '@angular/core';
import { Sidebar } from '../../core/components/sidebar/sidebar';
import { Header } from '../../core/components/header/header';
import { Footer } from '../../core/components/footer/footer';

@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, Header, Footer],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}
