import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item.model';
import { ItemService } from '../item/item.service';
import {ListStore} from "./list.store";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(
    private listStore: ListStore
  ) {
  }

  get items(): Item[] {
    return this.listStore.items;
  }
}
