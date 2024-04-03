import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://zuaxdbxtwsgsjecmzbds.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1YXhkYnh0d3Nnc2plY216YmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2MDg2NzYsImV4cCI6MjAyMTE4NDY3Nn0.mRlipJTuWw0iDWOjX-RpwjOBKxQfKUGBcziMWdbE_RI'
)

export async function createBucket() {
  const { data, error } = await supabase.storage.createBucket('images', {
    public: true,
  })

  if (error) {
    console.error('Error creating bucket:', error.message)
  } else {
    console.log('Bucket created successfully:', data)
  }
}

export async function uploadFile(file: File) {
  const { data, error } = await supabase.storage.from('images').upload('file_path', file)
  if (error) {
    console.error('Error uploading file:', error.message)
  } else {
    console.log('File uploaded successfully:', data)
  }
}
