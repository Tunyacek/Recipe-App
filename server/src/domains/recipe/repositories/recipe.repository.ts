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
    const createdRecipe = await prisma.recipe.create({
      data: { ...recipe },
    })
    return createdRecipe
  }

  const updateRecipe = async (id: string, recipe: RecipeSchema) => {
    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: id,
      },
      data: { ...recipe },
    })
    return updatedRecipe
  }

  const deleteRecipe = async (id: string) => {
    await prisma.recipe.delete({ where: { id: id } })
  }

  return {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}
