import { NotFoundError } from '../../../lib/errors'
import { ImageRepository } from '../repositories/image.repository.interface'

export const imageServiceFactory = async (repository: ImageRepository) => {
  const getImage = async (id: string) => {
    const imageResult = await repository.getImage(id)
    if (!imageResult) {
      throw new NotFoundError('Image not found')
    }
    return imageResult
  }

  const uploadImage = async (image: File) => {
    return await repository.uploadImage(image)
  }

  return {
    getImage,
    uploadImage,
  }
}
