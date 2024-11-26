import {Component, inject} from '@angular/core';
import {NavbarComponent} from './sharedpages/navbar/navbar.component';
import {SidenavComponent} from './sharedpages/sidenav/sidenav.component';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-root',
  imports: [NavbarComponent, SidenavComponent, NgIf, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'saulo-frontend';

  private _router = inject(Router);

  isLoginPage(): boolean {
    console.log(this._router.url);
    return this._router.url === '/login';
  }
}
