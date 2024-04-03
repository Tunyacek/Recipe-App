import { storageClient } from '../../../../supabase/storage-client'

export const imageRepositoryFactory = () => {
  const getImage = async () => {
    const { data, error } = await storageClient.from('images').download('path/to/rul')
    if (error) {
      throw error
    }
    return data
  }

  return {
    getImage,
  }
}
