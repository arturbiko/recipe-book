import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ListStore} from "../list/list.store";
import {Item} from "../item/item.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output()
  queryEvent = new EventEmitter<string>();

  @Output()
  addEvent = new EventEmitter();

  @Input()
  formVisible!: boolean;

  currentQuery: FormControl;

  constructor(
    private listStore: ListStore
  ) {
    this.currentQuery = new FormControl({
      value: '',
      disabled: false
    });
  }

  get items(): Item[] {
    return this.listStore.items;
  }

  ngOnInit(): void {
  }

  onChange(event: Event): void {
    this.queryEvent
      .emit((event.target as HTMLInputElement).value);
  }

  onAdd(): void {
    this.currentQuery.disable();

    this.addEvent
      .emit();
  }

  clearSearch(): void {
    this.currentQuery.reset();
  }
}
