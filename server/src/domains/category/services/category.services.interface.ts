import { Category } from '@prisma/client'
import { CategorySchema } from '../schemas/category.schema'

export interface CategoryService {
  getAllCategories: () => Promise<Category[]>
  getCategoryById: (id: string) => Promise<Category | null>
  createCategory: (category: CategorySchema) => Promise<Category>
}
