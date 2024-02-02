import { prisma } from '../../lib/prisma'

const getAllCategories = async () => {
  const allCategories = await prisma.category.findMany()
  return allCategories
}

const getCategoryById = async (id: string) => {
  const categoryById = await prisma.category.findUnique({ where: { id: id } })
  return categoryById
}
const createCategory = async (category: any) => {
  const { title, created_at, updated_at, recipes } = category
  const createdCategory = await prisma.category.create({
    data: {
      title,
      created_at,
      updated_at,
      recipes,
    },
  })
  return createdCategory
}

const updateCategory = async (category: any) => {
  const { id, title, created_at, updated_at, recipes } = category

  const updatedCategory = await prisma.category.update({
    where: {
      id: id,
    },
    data: {
      title,
      created_at,
      updated_at,
      recipes,
    },
  })
  return updatedCategory
}

const deleteCategory = async (id: string) => {
  await prisma.category.delete({ where: { id: id } })
}

export const categoryRepository = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
