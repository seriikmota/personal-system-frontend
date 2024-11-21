import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {DrawerService} from '../../services/drawer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    MatIcon,
    MatToolbar,
    MatIconButton
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private _drawerService = inject(DrawerService);

  toggleDrawer() {
    this._drawerService.toggle();
  }
}
