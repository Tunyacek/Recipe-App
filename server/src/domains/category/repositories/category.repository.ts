import { prisma } from '../../../lib/prisma'
import { CategorySchema } from '../schemas/category.schema'

export const categoryRepositoryFactory = () => {
  const getAllCategories = async () => {
    return await prisma.category.findMany()
  }

  const getCategoryById = async (ids: string[]) => {
    return await prisma.category.findMany({ where: { id: { in: ids } } })
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
