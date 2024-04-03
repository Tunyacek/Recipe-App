export interface ImageRepository {
  getImage: (id: string) => Promise<any>
}
