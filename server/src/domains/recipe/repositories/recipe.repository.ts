import { prisma } from '../../../lib/prisma'
import { RecipeSchema } from '../schemas/recipe.schema'

export const recipeRepositoryFactory = () => {
  const getAllRecipes = async (userId: string) => {
    return await prisma.recipe.findMany({
      where: { userId },
      include: {
        categoryId: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    })
  }

  const getRecipeById = async (id: string, userId: string) => {
    return await prisma.recipe.findUnique({
      where: { id, userId },
      include: {
        categoryId: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    })
  }

  const createRecipe = async (recipe: RecipeSchema) => {
    const { categoryTitles, portions, userId, ...rest } = recipe

    const categoryIds = await Promise.all(
      categoryTitles.map(async (title) => {
        const categories = await prisma.category.findMany({
          where: { title, userId },
        })
        return categories.length > 0 ? categories[0].id : null
      })
    )

    const validCategoryIds = categoryIds.filter((id): id is string => id !== null)

    const createdRecipe = await prisma.recipe.create({
      data: {
        ...rest,
        portions,
        user: {
          connect: { id: userId },
        },
        categoryId: {
          create: validCategoryIds.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
    })

    return createdRecipe
  }

  const updateRecipe = async (id: string, recipe: RecipeSchema) => {
    const { categoryTitles, portions, userId, ...rest } = recipe

    const categoryIds = await Promise.all(
      categoryTitles.map(async (title) => {
        const categories = await prisma.category.findMany({
          where: { title, userId },
        })
        return categories.length > 0 ? categories[0].id : null
      })
    )

    const validCategoryIds = categoryIds.filter((id): id is string => id !== null)

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        ...rest,
        portions,
        user: {
          connect: { id: userId },
        },
        categoryId: {
          set: [],
          create: validCategoryIds.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
    })

    return updatedRecipe
  }

  const deleteRecipe = async (id: string) => {
    await prisma.recipeCategory.deleteMany({
      where: {
        recipeId: id,
      },
    })

    await prisma.recipe.delete({
      where: { id },
    })
  }

  return {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}
