import { Component, Input, OnInit } from '@angular/core';
import { Item } from './item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input()
  item!: Item;

  constructor() {
  }

  ngOnInit(): void {
  }

  get ingredients(): string {
    let label = '';

    label = this.item.value.ingredients
      .map(i => i.name)
      .slice(0, 3)
      .join(", ");

    if (this.item.value.ingredients.length > 3) {
      label += "";
    }

    return label;
  }

  get likes(): string {
    return this.item.value.likes.toString();
  }
}
