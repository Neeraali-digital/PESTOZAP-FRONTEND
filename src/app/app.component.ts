import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  template: `
    <div class="min-h-screen flex flex-col bg-white">
      <app-navbar *ngIf="!isAdminRoute"></app-navbar>
      <main [class]="isAdminRoute ? 'admin-main' : 'flex-grow'">
        <router-outlet></router-outlet>
      </main>
      <app-footer *ngIf="!isAdminRoute"></app-footer>
    </div>
  `,
  styles: ['.admin-main{height:100vh;overflow:hidden}']
})
export class AppComponent {
  isAdminRoute = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.isAdminRoute = (event as NavigationEnd).url.startsWith('/admin');
    });
  }
}