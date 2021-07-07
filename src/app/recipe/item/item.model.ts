import { Ingredient } from "./ingredient.model";

export interface Item {

  id: string;
  key: string;

  value: {
    name: string;
    description: string;
    ingredients: Ingredient[];
  }
}
