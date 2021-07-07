import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {

  @Input()
  ingredients: FormArray;

  constructor() {
    this.ingredients = new FormArray([new FormControl('')]);
  }

  ngOnInit(): void {
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }
}
