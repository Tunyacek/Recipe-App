import { NotFoundError } from '../../../lib/errors'
import { CategoryRepository } from '../../category/repositories/category.repository.interface'
import { CategorySchema } from '../../category/schemas/category.schema'

export const categoryValidationServiceFactory = (categoryRepository: CategoryRepository) => {
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
