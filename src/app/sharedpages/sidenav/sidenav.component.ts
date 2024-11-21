import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterOutlet} from "@angular/router";
import {DrawerService} from '../../services/drawer.service';

@Component({
  selector: 'app-sidenav',
    imports: [
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        MatListItem,
        MatNavList,
        RouterOutlet
    ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  private _drawerService = inject(DrawerService);

  ngAfterViewInit() {
    this._drawerService.setDrawer(this.drawer);
  }
}
