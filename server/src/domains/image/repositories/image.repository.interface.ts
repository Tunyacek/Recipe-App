export interface ImageRepository {
  uploadImage: (image: File, id: string) => Promise<File>
}
