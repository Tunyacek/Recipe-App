import express, { Router } from 'express'
import { asyncHandler } from '../../../lib/utils'
import { ImageController } from '../controllers/image.controllers.interface'

export const imageRouter: Router = express.Router()
type ImageRouterFactory = (controller: ImageController) => Router

export const imageRouterFactory: ImageRouterFactory = (controller: ImageController) => {
  imageRouter.get('/:id', asyncHandler(controller.getImage))

  return imageRouter
}
