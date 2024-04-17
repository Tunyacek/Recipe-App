import { storageClient } from '../../../lib/storage'

export const imageRepositoryFactory = () => {
  const uploadImage = async (image: File, id: string) => {
    const fileBody = image
    const { data, error } = await storageClient.from('images').upload(`path/to/${id}`, fileBody)
    if (error) {
      throw error
    }
    const imagePath = data.path
    return { path: imagePath }
  }

  return {
    uploadImage,
  }
}
