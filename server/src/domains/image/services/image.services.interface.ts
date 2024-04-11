export interface ImageService {
  uploadImage: (image: File, id: string) => Promise<File>
}
