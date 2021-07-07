import { Router } from "express";

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

export default router;
