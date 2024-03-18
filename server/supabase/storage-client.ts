import { StorageClient } from '@supabase/storage-js'

const storage_url = process.env.STORAGE_URL || ''
const service_key = process.env.SERVICE_KEY || ''

export const storageClient = new StorageClient(storage_url, {
  apikey: service_key,
  Authorization: `Bearer ${service_key}`,
})
