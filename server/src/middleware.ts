import type { Request, Response, NextFunction } from 'express'
import { BaseCustomError } from './lib/errors'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseCustomError) {
    return res.status(err.statusCode).json({
      error: { message: err.message },
    })
  }

  res.status(500).json({
    error: { message: 'Something went wrong' },
  })
}
