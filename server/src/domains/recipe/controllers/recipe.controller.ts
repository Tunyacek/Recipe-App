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

interface User {
  id: string
  email: string
  username: string
}

export const recipeControllerFactory: RecipeControllerFactory = (service: RecipeService) => {
  const getAllRecipes = async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req.user as User).id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated.' })
    }

    const userRecipes = await service.getAllRecipes(userId)
    return res.status(StatusCodes.OK).json(userRecipes)
  }

  const getRecipeById = async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req.user as User).id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated.' })
    }

    const recipeResult = await service.getRecipeById(req.params.id, userId)
    return res.status(StatusCodes.OK).json(recipeResult)
  }

  const createRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req.user as User).id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated.' })
    }

    const parsedRecipe = recipeSchema.safeParse(req.body)
    if (!parsedRecipe.success) {
      throw new UnprocessableEntityError(parsedRecipe.error)
    }

    const createdRecipe = await service.createRecipe(req.body)
    return res.status(StatusCodes.CREATED).json(createdRecipe)
  }

  const updateRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req.user as User).id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated.' })
    }

    const parsedRecipe = recipeSchema.safeParse(req.body)
    if (!parsedRecipe.success) {
      throw new UnprocessableEntityError(parsedRecipe.error)
    }

    const updatedRecipe = await service.updateRecipe(req.params.id, req.body, userId)
    return res.status(StatusCodes.OK).json(updatedRecipe)
  }

  const deleteRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req.user as User)?.id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated.' })
    }

    await service.deleteRecipe(req.params.id, userId)
    return res.status(StatusCodes.OK).json({ message: 'Recipe successfully deleted.' })
  }

  return {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}
