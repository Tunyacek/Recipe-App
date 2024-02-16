import { CategoryRepository } from '../repositories/category.repository.interface'
import { NotFoundError } from '../../../lib/errors'

export const categoryService = (categoryRepository: CategoryRepository) => {
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
  return {
    getAllCategories,
    getCategoryById,
  }
}
