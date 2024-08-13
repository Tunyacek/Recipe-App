import { Request, Response, NextFunction } from 'express'
import { UnprocessableEntityError } from '../../../lib/errors'
import { recipeSchema } from '../schemas/recipe.schema'
import { RecipeService } from '../services/recipe.services.interface'
import { StatusCodes } from 'http-status-codes'
import { ExpressControllerFn } from '../../../lib/utils'

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
    return res.status(StatusCodes.OK).json(recipeResult)
  }

  const createRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    console.log(res)
    const parsedRecipe = recipeSchema.safeParse(req.body)
    if (!parsedRecipe.success) {
      throw new UnprocessableEntityError(parsedRecipe.error)
    }

    const createdRecipe = await service.createRecipe(req.body, '1')

    return res.status(StatusCodes.CREATED).json(createdRecipe)
  }

  const updateRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    const parsedRecipe = recipeSchema.safeParse(req.body)
    if (!parsedRecipe.success) {
      throw new UnprocessableEntityError(parsedRecipe.error)
    }
    const id = req.params.id

    /* const userId = req.user?.id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated.' })
    } */
    const updatedRecipe = await service.updateRecipe(id, req.body, '1')

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
