export interface CategoryValidationService {
  categoryExists: (id: string) => Promise<boolean>
}
