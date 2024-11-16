import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
