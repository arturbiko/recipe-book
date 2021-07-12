import {Ingredient} from "./ingredient.model";

export interface RecipeModel {
  id?: string,
  name: string;
  ingredients: Ingredient[];
  description?: string;
  likes: number;
}
