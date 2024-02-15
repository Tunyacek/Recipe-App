import { RecipeRepository } from '../repositories/recipe.repository.interface'
import { RecipeSchema } from '../../schemas/recipe.schema'
import { NotFoundError } from '../../lib/errors'
import { UnprocessableEntity } from '../../lib/errors'

export const recipeService = (recipeRepository: RecipeRepository) => {
  const getAllRecipes = async () => {
    return await recipeRepository.getAllRecipes()
  }

  const getRecipeById = async (id: string) => {
    return await recipeRepository.getRecipeById(id)
  }

  const createRecipe = async (recipe: RecipeSchema) => {
    const createdRecipe = await recipeRepository.createRecipe(recipe)

    if (!createdRecipe) {
      throw new UnprocessableEntity('Unprocessable Entity')
    }
    return await recipeRepository.createRecipe(recipe)
  }

  const updateRecipe = async (id: string, recipe: RecipeSchema) => {
    const updatedRecipe = await recipeRepository.updateRecipe(id, recipe)
    if (!updatedRecipe) {
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
