export interface ImageService {
  getImage: (id: string) => Promise<File>
  uploadImage: (image: File) => Promise<File>
}
