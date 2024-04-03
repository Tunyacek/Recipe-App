export interface ImageRepository {
  getImage: (image_url: string) => Promise<any>
}
