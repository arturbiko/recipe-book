import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ItemComponent } from './recipe/item/item.component';
import { ListComponent } from './recipe/list/list.component';
import { CreateComponent } from './form/recipe/create/create.component';
import { IngredientsComponent } from "./form/recipe/ingredients/ingredients.component";
import { SearchComponent } from './recipe/search/search.component';
import { SpinnerComponent } from './componets/spinner/spinner.component';
import { PaginatorComponent } from './componets/paginator/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    ItemComponent,
    CreateComponent,
    IngredientsComponent,
    SearchComponent,
    SpinnerComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
