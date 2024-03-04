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

export const categoryControllerFactory: CategoryControllerFactory = (service: CategoryService) => {
  const getAllCategories = async (_req: Request, res: Response, _next: NextFunction) => {
    const allCategories = await service.getAllCategories()
    return res.status(StatusCodes.OK).json(allCategories)
  }
  const getCategoryById = async (req: Request, res: Response, _next: NextFunction) => {
    const categoryResult = await service.getCategoryById(req.params.id)
    return res.status(StatusCodes.OK).json(categoryResult)
  }

  const createCategory = async (req: Request, res: Response, _next: NextFunction) => {
    const parsedCategory = categorySchema.safeParse(req.body)
    if (!parsedCategory.success) {
      throw new UnprocessableEntityError(parsedCategory.error)
    }
    const createdCategory = await service.createCategory(parsedCategory.data)
    return res.status(StatusCodes.CREATED).json(createdCategory)
  }

  return {
    getAllCategories,
    getCategoryById,
    createCategory,
  }
}
