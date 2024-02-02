import express, { Router } from 'express'
import { recipeControlller } from '../recipe/controllers/recipe.controller'

export const recipeRouter: Router = express.Router()

recipeRouter.get('/', recipeControlller.getAllRecipes)

recipeRouter.get('/:id', recipeControlller.getRecipeById)

recipeRouter.post('/', recipeControlller.createRecipe)

recipeRouter.patch('/:id', recipeControlller.updateRecipe)

recipeRouter.delete('/:id', recipeControlller.deleteRecipe)
