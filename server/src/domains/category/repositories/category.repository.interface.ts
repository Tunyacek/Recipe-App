import { Category } from '@prisma/client'

export interface CategoryRepository {
  getAllCategories: () => Promise<Category[]>
  getCategoryById: (id: string) => Promise<Category | null>
}
