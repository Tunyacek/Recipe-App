import { Category } from '@prisma/client'
import { CategorySchema } from '../schemas/category.schema'

export interface CategoryRepository {
  getAllCategories: () => Promise<Category[]>
  getCategoryById: (ids: string[]) => Promise<Category[]>
  createCategory: (category: CategorySchema) => Promise<Category>
}
