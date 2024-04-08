import { storageClient } from '../../../../supabase/storage-client'

export const imageRepositoryFactory = () => {
  const getImage = async (id: string) => {
    const { data, error } = await storageClient.from('images').download(`path/to/${id}`)
    if (error) {
      throw error
    }
    return data as File
  }

  const uploadImage = async (image: File, id: string) => {
    const fileBody = image
    const { data, error } = await storageClient.from('bucket').upload(`path/to/${id}`, fileBody)
    if (error) {
      throw error
    }

    if (typeof data === 'string') {
      const file = new File([data], 'name')
      return file
    } else {
      throw new Error('Unexpected data format returned from upload')
    }
  }

  return {
    getImage,
    uploadImage,
  }
}
