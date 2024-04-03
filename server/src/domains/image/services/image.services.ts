import { NotFoundError } from '../../../lib/errors'
import { ImageRepository } from '../repositories/image.repository.interface'

export const imageServiceFactory = async (imageRepository: ImageRepository) => {
  const getImage = async (image_url: string) => {
    const imageResult = await imageRepository.getImage(image_url)
    if (!imageResult) {
      throw new NotFoundError('Image not found')
    }
    return imageResult
  }

  return {
    getImage,
  }
}
