import {Router} from "express";
import {RecipeModel} from "../../src/app/recipe/item/recipe.model";
import {randomUUID} from "crypto";

const express = require('express');
const router: Router = express.Router();

const nano = require('nano')(process.env.DATABASE_URL);
const recipes = nano.db.use(process.env.DATABASE_NAME);

async function fetchAllRecipes() {
  return await recipes.partitionedView('recipe', 'recipes', 'all');
}

async function searchBy(key: string, value: string) {
  return await recipes.partitionedView('recipe', 'recipes', 'recipe', {
    key: value
  });
}

async function addRecipe(recipe: RecipeModel) {
  return await recipes.insert(recipe, `recipe:${randomUUID()}`);
}

router.get('/all', function (req, res) {
  fetchAllRecipes()
    .then(data => {
      res.json(data.rows);
    });
});

router.get('/find/:recipeName', function (req, res) {
  searchBy('name', req.params.recipeName)
    .then(data => {
      res.json(data.rows);
    });
});

router.post('/add', function (req, res) {
  const data = req.body;

  const recipe: RecipeModel = {
    name: data.body.name,
    description: data.body.description,
    ingredients: data.body.ingredients,
    likes: parseInt(data.body.likes)
  }

  addRecipe(recipe)
    .then(data => res.json({
      id: data.id,
      ok: data.ok
    }))
    .catch(error => {
      console.log(error)
    })
});

export default router;
