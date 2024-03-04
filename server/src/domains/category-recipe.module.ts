import { categoryRepository } from './category/repositories/category.repository'

export const categoryValidationService = () => {
  const repository = categoryRepository()

  return repository
}
