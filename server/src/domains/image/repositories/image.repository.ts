import { storageClient } from '../../../../supabase/storage-client'

export const imageRepositoryFactory = () => {
  const getImage = async (id: string) => {
    const { data, error } = await storageClient.from('images').download(`path/to/${id}`)
    if (error) {
      throw error
    }
    return data
  }

  const uploadImage = async (id: string) => {
    const fileBody = 'something' // load your file here
    const { data, error } = await storageClient.from('bucket').upload(`path/to/${id}`, fileBody)
    if (error) {
      throw error
    }
    return data
  }

  return {
    getImage,
    uploadImage,
  }
}
