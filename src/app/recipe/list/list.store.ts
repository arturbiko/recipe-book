import {Injectable} from "@angular/core";
import {Item} from "../item/item.model";

@Injectable({
  providedIn: 'root',
})
export class ListStore {

  items: Item[];

  constructor() {
    this.items = [];
  }
}
