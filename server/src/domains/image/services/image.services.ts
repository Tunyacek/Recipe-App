import { ImageRepository } from '../repositories/image.repository.interface'

export const imageServiceFactory = (repository: ImageRepository) => {
  const uploadImage = async (image: File, id: string) => {
    return await repository.uploadImage(image, id)
  }

  return {
    uploadImage,
  }
}
