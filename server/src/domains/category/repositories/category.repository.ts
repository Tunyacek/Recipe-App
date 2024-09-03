import { prisma } from '../../../lib/prisma'
import { CategorySchema } from '../schemas/category.schema'

export const categoryRepositoryFactory = () => {
  const getAllCategories = async (userId: string) => {
    const categories = await prisma.category.findMany({
      where: { userId },
    })
    return categories || []
  }

  const getCategoryByTitle = async (titles: string[], userId: string) => {
    return await prisma.category.findMany({ where: { title: { in: titles }, userId: userId } })
  }

  const getCategoryById = async (id: string[], userId: string) => {
    return await prisma.category.findMany({ where: { id: { in: id }, userId: userId } })
  }

  const createCategory = async (category: CategorySchema, userId: string) => {
    const createdCategory = await prisma.category.create({
      data: {
        ...category,
        user: {
          connect: { id: userId },
        },
      },
    })
    return createdCategory
  }

  return {
    getCategoryById,
    getAllCategories,
    getCategoryByTitle,
    createCategory,
  }
}
