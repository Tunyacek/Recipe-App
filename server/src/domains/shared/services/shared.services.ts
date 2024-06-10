import { CategoryRepository } from '../../category/repositories/category.repository.interface'

export const categoryValidationServiceFactory = (categoryRepository: CategoryRepository) => {
  const categoryExists = async (ids: string[]) => {
    const categories = await categoryRepository.getCategoryById(ids)
    return categories.length === ids.length
  }

  return {
    categoryExists,
  }
}
