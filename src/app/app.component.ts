import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from "./recipe/item/item.service";
import {ListStore} from "./recipe/list/list.store";
import {debounce} from "debounce";
import {SearchComponent} from "./recipe/search/search.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recipe-book';

  @ViewChild('appSearch')
  searchComponent!: SearchComponent;

  showForm: boolean;

  recipeName: string;

  constructor(
    private itemService: ItemService,
    private listStore: ListStore
  ) {
    this.showForm = false;
    this.recipeName = '';
  }

  ngOnInit(): void {
    this.fetchAllUser();
  }

  debouncedSearch = debounce((value: string) => {
    this.itemService.fetchByQuery(value)
      .subscribe(data => {
        this.listStore.items = data;
      })
  }, 500);

  fetchAllUser(): void {
    this.itemService.fetchAll()
      .subscribe(data => {
        this.listStore.items = data;
      });
  }

  triggerSearch(value: string): void {
    this.recipeName = value;

    if ('' === value) {
      this.fetchAllUser();
      return;
    }

    this.debouncedSearch(value);
  }

  createRecipe(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.searchComponent.currentQuery.enable();

    this.fetchAllUser();
  }

  resetQuery(): void {
    this.searchComponent.currentQuery.reset();
  }
}
