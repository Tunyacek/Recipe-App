import { RecipeRepository } from '../repositories/recipe.repository.interface'
import { RecipeSchema } from '../../schemas/recipe.schema'

export const recipeService = (recipeRepository: RecipeRepository) => {
  const getAllRecipes = async () => {
    return await recipeRepository.getAllRecipes()
  }

  const getRecipeById = async (id: string) => {
    return await recipeRepository.getRecipeById(id)
  }

  const createRecipe = async (recipe: RecipeSchema) => {
    return await recipeRepository.createRecipe(recipe)
  }

  const updateRecipe = async (id: string, recipe: RecipeSchema) => {
    return await recipeRepository.updateRecipe(id, recipe)
  }

  const deleteRecipe = async (id: string) => {
    return await recipeRepository.deleteRecipe(id)
  }

  return { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe }
}
