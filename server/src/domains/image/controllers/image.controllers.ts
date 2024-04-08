import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ImageService } from '../services/image.services.interface'
import { ExpressControllerFn } from '../../../lib/utils'
import { v4 as uuidv4 } from 'uuid'

type imageControllerFactory = (service: ImageService) => {
  getImage: ExpressControllerFn
  uploadImage: ExpressControllerFn
}

export const imageControllerFactory: imageControllerFactory = (service: ImageService) => {
  const getImage = async (req: Request, res: Response, _next: NextFunction) => {
    const imageUrl: string | undefined = req.query.image_url as string | undefined
    if (!imageUrl) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Image URL is required' })
    }

    const imageResult = await service.getImage(imageUrl)

    return res.status(StatusCodes.OK).json(imageResult)
  }

  const uploadImage = async (req: Request, res: Response, _next: NextFunction) => {
    const id = uuidv4()
    const uploadedImage = await service.uploadImage(req.body, id)

    return res.status(StatusCodes.CREATED).json(uploadedImage)
  }
  return {
    getImage,
    uploadImage,
  }
}
