import express, { Router } from 'express'
import { asyncHandler } from '../../../lib/utils'
import { ImageController } from '../controllers/image.controllers.interface'
import multer from 'multer'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

export const imageRouter: Router = express.Router()
type ImageRouterFactory = (controller: ImageController) => Router

export const imageRouterFactory: ImageRouterFactory = (controller: ImageController) => {
  imageRouter.post('/upload', asyncHandler(controller.uploadImage))

  return imageRouter
}
