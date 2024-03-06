import { CategoryRepository } from '../repositories/category.repository.interface'
import { NotFoundError } from '../../../lib/errors'
import { CategorySchema } from '../schemas/category.schema'

export const categoryServiceFactory = (categoryRepository: CategoryRepository) => {
  const getAllCategories = async () => {
    return await categoryRepository.getAllCategories()
  }

  const getCategoryById = async (id: string) => {
    const categoryResult = await categoryRepository.getCategoryById(id)
    if (!categoryResult) {
      throw new NotFoundError('Category not found')
    }
    return categoryResult
  }

  const createCategory = async (category: CategorySchema) => {
    const createdCategory = await categoryRepository.createCategory(category)
    return createdCategory
  }

  return {
    getAllCategories,
    getCategoryById,
    createCategory,
  }
}
