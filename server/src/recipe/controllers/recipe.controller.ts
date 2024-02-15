import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../lib/errors'
import { UnprocessableEntity } from '../../lib/errors'
import { recipeSchema } from '../../schemas/recipe.schema'
import { RecipeService } from '../services/recipe.services.interface'
import { StatusCodes } from 'http-status-codes'
import { ExpressControllerFn } from '../../lib/utils'

type RecipeControllerFactory = (service: RecipeService) => {
  getAllRecipes: ExpressControllerFn
  getRecipeById: ExpressControllerFn
  createRecipe: ExpressControllerFn
  updateRecipe: ExpressControllerFn
  deleteRecipe: ExpressControllerFn
}

export const recipeControllerFactory: RecipeControllerFactory = (service: RecipeService) => {
  const getAllRecipes = async (_req: Request, res: Response, _next: NextFunction) => {
    const allRecipes = await service.getAllRecipes()
    return res.status(StatusCodes.OK).json(allRecipes)
  }
  const getRecipeById = async (req: Request, res: Response, _next: NextFunction) => {
    const recipeResult = await service.getRecipeById(req.params.id)
    if (!recipeResult) {
      throw new NotFoundError('Recipe not found')
    }
    return res.status(StatusCodes.OK).json(recipeResult)
  }

  const createRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    const parsedRecipe = recipeSchema.safeParse(req.body)
    if (!parsedRecipe.success) {
      throw new UnprocessableEntity('Unprocessable Entity')
    }
    const createdRecipe = await service.createRecipe(req.body)

    return res.status(StatusCodes.CREATED).json(createdRecipe)
  }
  const updateRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    const parsedRecipe = recipeSchema.safeParse(req.body)
    if (!parsedRecipe.success) {
      throw new UnprocessableEntity('Unprocessable Entity')
    }
    const id = req.params.id
    const updatedRecipe = await service.updateRecipe(id, req.body)

    return res.status(StatusCodes.OK).json(updatedRecipe)
  }
  const deleteRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id
    await service.deleteRecipe(id)
    return res.status(StatusCodes.OK).json({ message: 'Recept úspěšně smazán.' })
  }

  return {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}
