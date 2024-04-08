export interface ImageRepository {
  getImage: (id: string) => Promise<File>
  uploadImage: (image: File, id: string) => Promise<File>
}
