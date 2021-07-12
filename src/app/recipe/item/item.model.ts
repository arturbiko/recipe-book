import { Ingredient } from "./ingredient.model";
import {RecipeModel} from "./recipe.model";

export interface Item {

  id: string;
  key: string;

  value: RecipeModel;
}
