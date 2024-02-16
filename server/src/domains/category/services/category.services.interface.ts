import { Category } from '@prisma/client'

export interface CategoryService {
  getAllCategories: () => Promise<Category[]>
  getCategoryById: (id: string) => Promise<Category | null>
}
