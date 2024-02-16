import { prisma } from '../../../lib/prisma'

export const categoryRepository = () => {
  const getAllCategories = async () => {
    return await prisma.category.findMany()
  }

  const getCategoryById = async (id: string) => {
    return await prisma.category.findUnique({ where: { id: id } })
  }
  return {
    getAllCategories,
    getCategoryById,
  }
}
