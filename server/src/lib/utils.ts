import type { Request, Response, NextFunction } from 'express'
import { RecipeSchema } from '../schemas/recipe.schema'

export type ExpressControllerFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<unknown>>

export const asyncHandler =
  (fn: ExpressControllerFn) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next)

export type ExpressResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<unknown>>
