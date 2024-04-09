import { Category } from '@prisma/client'

export interface CategoryValidationService {
  categoryExists: (id: string) => Promise<Category>
}
