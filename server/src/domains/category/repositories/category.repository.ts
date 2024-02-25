import { prisma } from '../../../lib/prisma'
import { CategorySchema } from '../schemas/category.schema'

export const categoryRepository = () => {
  const getAllCategories = async () => {
    return await prisma.category.findMany()
  }

  const getCategoryById = async (id: string) => {
    return await prisma.category.findUnique({ where: { id: id } })
  }

  const createCategory = async (category: CategorySchema) => {
    const createdCategory = await prisma.category.create({
      data: { ...category },
    })
    return createdCategory
  }
  return {
    getAllCategories,
    getCategoryById,
    createCategory,
  }
}
