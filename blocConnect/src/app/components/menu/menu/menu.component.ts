import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { residentNavbarData, adminNavbarData } from './nav-data';
import { INavbarData } from './helper';
import { UserService } from 'src/app/services/user.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit{


  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  screenWidth = 0;

  collapsed = false;
  navData : INavbarData[] = [];
  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.loadMenu();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData): void {
    if(!this.multiple) {
      for(let modelItem of this.navData){
        if(item !== modelItem && modelItem.expanded){
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  loadMenu(): void {
    this.userService.getLoggedUserRole().subscribe(role => {
      if(role === 'resident') {
        this.navData = residentNavbarData;
      } else if (role === 'admin') {
        this.navData = adminNavbarData;
      } else {
        console.error('Rolul utilizatorului nu este valid');
      }
    });
  }


}
