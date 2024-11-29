import {Component, inject} from '@angular/core';
import {NavbarComponent} from './sharedpages/navbar/navbar.component';
import {SidenavComponent} from './sharedpages/sidenav/sidenav.component';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {SecurityService} from './authentication/security/security.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, SidenavComponent, NgIf, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _router = inject(Router);
  private _securityService = inject(SecurityService);
  title = 'saulo-frontend';
  showBars: boolean = true;

  constructor() {
    this._securityService.init();

    this._router.events.subscribe(() => {
      this.showBars = this._router.url !== '/login';
    });
  }
}
