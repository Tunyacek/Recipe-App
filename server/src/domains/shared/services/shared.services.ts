import { CategoryRepository } from '../../category/repositories/category.repository.interface'

export const categoryValidationServiceFactory = (categoryRepository: CategoryRepository) => {
  const categoryExists = async (id: string) => {
    const category = await categoryRepository.getCategoryById(id)
    return !!category
  }

  return {
    categoryExists,
  }
}
