import { Category } from '@prisma/client'
import { CategorySchema } from '../schemas/category.schema'

export interface CategoryService {
  getAllCategories: () => Promise<Category[]>
  getCategoryById: (ids: string[]) => Promise<Category[]>
  createCategory: (category: CategorySchema) => Promise<Category>
}
