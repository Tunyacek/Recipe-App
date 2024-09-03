import { Request, Response, NextFunction } from 'express'
import { UnprocessableEntityError } from '../../../lib/errors'
import { CategoryService } from '../services/category.services.interface'
import { StatusCodes } from 'http-status-codes'
import { ExpressControllerFn } from '../../../lib/utils'
import { categorySchema } from '../schemas/category.schema'

type CategoryControllerFactory = (service: CategoryService) => {
  getAllCategories: ExpressControllerFn
  getCategoryById: ExpressControllerFn
  createCategory: ExpressControllerFn
}

interface User {
  id: string
  email: string
  username: string
}

export const categoryControllerFactory: CategoryControllerFactory = (service: CategoryService) => {
  const getAllCategories = async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req.user as User).id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated.' })
    }

    const allCategories = await service.getAllCategories(userId)
    return res.status(StatusCodes.OK).json(allCategories)
  }

  const getCategoryById = async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req.user as User).id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated.' })
    }

    const categoryResult = await service.getCategoryById([req.params.id], userId)
    return res.status(StatusCodes.OK).json(categoryResult)
  }

  const createCategory = async (req: Request, res: Response, _next: NextFunction) => {
    const userId = (req.user as User).id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated.' })
    }

    const parsedCategory = categorySchema.safeParse(req.body)
    if (!parsedCategory.success) {
      throw new UnprocessableEntityError(parsedCategory.error)
    }
    const createdCategory = await service.createCategory(parsedCategory.data, userId)
    return res.status(StatusCodes.CREATED).json(createdCategory)
  }

  return {
    getAllCategories,
    getCategoryById,
    createCategory,
  }
}
