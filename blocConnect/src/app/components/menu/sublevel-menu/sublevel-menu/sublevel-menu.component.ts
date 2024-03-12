import { Component, Input, OnInit } from '@angular/core';
import { INavbarData } from '../../menu/helper';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sublevel-menu',
  templateUrl: './sublevel-menu.component.html',
  styleUrls: ['./sublevel-menu.component.css'],
  animations: [
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({overflow:'hidden'}),
        animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SublevelMenuComponent implements OnInit{

  @Input() data: INavbarData = {
    routeLink : '',
    icon: '',
    label: '',
    items: []
  }

  @Input() collapsed: boolean = false;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;



  handleClick(item: any):void {
    if(!this.multiple) {
      if(this.data.items && this.data.items.length > 0) {
        for(let modelItem of this.data.items) {
          if(item !== modelItem && modelItem.expanded){
            modelItem.expanded = false;
          }
        } 
      }
    }
    item.expanded = !item.expanded;

  }



  constructor() { }

  ngOnInit(): void {
  }
}
