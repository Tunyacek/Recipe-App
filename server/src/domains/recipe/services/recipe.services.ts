import { RecipeRepository } from '../repositories/recipe.repository.interface'
import { RecipeSchema } from '../schemas/recipe.schema'
import { NotFoundError, UnprocessableEntityError } from '../../../lib/errors'
import { category } from '../../category/services/category.services'

export const recipeService = (recipeRepository: RecipeRepository) => {
  const getAllRecipes = async () => {
    return await recipeRepository.getAllRecipes()
  }

  const getRecipeById = async (id: string) => {
    const recipeResult = await recipeRepository.getRecipeById(id)
    if (!recipeResult) {
      throw new NotFoundError('Recipe not found')
    }
    return recipeResult
  }

  const createRecipe = async (recipe: RecipeSchema) => {
    if (!category) {
      throw new UnprocessableEntityError('Unprocessable Entity')
    }
    const createdRecipe = await recipeRepository.createRecipe(recipe)
    return createdRecipe
  }

  const updateRecipe = async (id: string, recipe: RecipeSchema) => {
    const foundRecipe = await recipeRepository.getRecipeById(id)
    if (!foundRecipe) {
      throw new NotFoundError('Recipe not found')
    }
    return await recipeRepository.updateRecipe(id, recipe)
  }

  const deleteRecipe = async (id: string) => {
    const foundRecipe = await recipeRepository.getRecipeById(id)
    if (!foundRecipe) {
      throw new NotFoundError('Recipe not found')
    }
    return await recipeRepository.deleteRecipe(id)
  }

  return { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe }
}
