import { categoryRepository } from '../repositories/category.repository'

const getAllCategories = async () => {
  return await categoryRepository.getAllCategories()
}

const getCategoryById = async (id: string) => {
  return await categoryRepository.getCategoryById(id)
}

const createCategory = async (category: any) => {
  return await categoryRepository.createCategory(category)
}

const updateCategory = async (category: any) => {
  return await categoryRepository.updateCategory(category)
}

const deleteCategory = async (id: string) => {
  return await categoryRepository.deleteCategory(id)
}

export const categoryService = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
