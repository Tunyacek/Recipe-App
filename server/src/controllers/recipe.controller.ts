import { Request, Response, NextFunction } from 'express'
import { recipeService } from '../services/recipe.services'
import { NotFoundError } from '../lib/errors'
import { UnprocessableEntity } from '../lib/errors'
import { Recipe } from '../zod'

const getAllRecipes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allRecipes = await recipeService.getAllRecipes()
    if (!allRecipes) {
      throw new NotFoundError('Recipes not found')
    }
    return res.json(allRecipes)
  } catch (err) {
    next(err)
  }
}

const getRecipeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipeResult = await recipeService.getRecipeById(req.params.id)
    if (!recipeResult) {
      throw new NotFoundError('Recipe not found')
    }
    return res.json(recipeResult)
  } catch (err) {
    next(err)
  }
}

const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedRecipe = Recipe.parse(req.body)
    const id = req.params.id
    const createdRecipe = await recipeService.createRecipe({ id, parsedRecipe })
    if (!createdRecipe) {
      throw new UnprocessableEntity('Unprocessable Entity')
    }
    return res.json(createdRecipe)
  } catch (err) {
    next(err)
  }
}

const updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedRecipe = Recipe.parse(req.body)
    const id = req.params.id
    const updatedRecipe = await recipeService.updateRecipe({ id, parsedRecipe })
    if (!updatedRecipe) {
      throw new UnprocessableEntity('Unprocessable Entity')
    }
    return res.json(updatedRecipe)
  } catch (err) {
    next(err)
  }
}

const deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  try {
    const foundRecipe = await recipeService.getRecipeById(id)
    if (!foundRecipe) {
      throw new NotFoundError('Recipe not found')
    }
    await recipeService.deleteRecipe(id)
    return res.json({ message: 'Recept úspěšně smazán.' })
  } catch (err) {
    next(err)
  }
}

export const recipeControlller = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}
