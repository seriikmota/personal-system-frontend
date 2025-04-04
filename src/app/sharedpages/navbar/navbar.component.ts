import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DrawerService } from '../../services/drawer.service';
import {SecurityService} from '../../authentication/security/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    MatIcon,
    MatToolbar,
    MatIconButton,
    MatMenuModule
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private _drawerService = inject(DrawerService);
  private _securityService = inject(SecurityService);

  toggleDrawer() {
    this._drawerService.toggle();
  }

  logout() {
    this._securityService.logout();
  }
}
