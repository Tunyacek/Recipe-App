import { prisma } from '../../../lib/prisma'
import { RecipeSchema } from '../schemas/recipe.schema'

export const recipeRepositoryFactory = () => {
  const getAllRecipes = async () => {
    return await prisma.recipe.findMany()
  }

  const getRecipeById = async (id: string) => {
    return await prisma.recipe.findUnique({ where: { id: id } })
  }

  const createRecipe = async (recipe: RecipeSchema) => {
    const { categoryId, ...rest } = recipe

    const createdRecipe = await prisma.recipe.create({
      data: {
        ...rest,
        categoryId: {
          create: categoryId.map((id) => ({ category: { connect: { id } } })),
        },
      },
    })
    return createdRecipe
  }

  const updateRecipe = async (id: string, recipe: RecipeSchema) => {
    const { categoryId, ...rest } = recipe

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        ...rest,
        categoryId: {
          set: [],
          create: categoryId.map((id) => ({ category: { connect: { id } } })),
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
  }

  return {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}
