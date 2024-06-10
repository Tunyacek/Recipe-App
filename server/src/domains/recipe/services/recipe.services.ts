import { RecipeRepository } from '../repositories/recipe.repository.interface'
import { RecipeSchema } from '../schemas/recipe.schema'
import { NotFoundError, UnprocessableEntityError } from '../../../lib/errors'
import { CategoryValidationService } from '../../shared/services/shared.services.interface'

export const recipeServiceFactory = (
  recipeRepository: RecipeRepository,
  categoryValidationService: CategoryValidationService
) => {
  const getAllRecipes = async () => {
    return await recipeRepository.getAllRecipes()
  }

  const getRecipeById = async (id: string) => {
    const recipeResult = await recipeRepository.getRecipeById(id)
    if (!recipeResult) {
      throw new NotFoundError('Recept nenalezen')
    }
    return recipeResult
  }

  const createRecipe = async (recipe: RecipeSchema) => {
    const categoryExists = await categoryValidationService.categoryExists(recipe.categoryId)
    if (!categoryExists) {
      throw new UnprocessableEntityError('Kategorie neexistuje')
    }
    const createdRecipe = await recipeRepository.createRecipe(recipe)
    return createdRecipe
  }

  const updateRecipe = async (id: string, recipe: RecipeSchema) => {
    const foundRecipe = await recipeRepository.getRecipeById(id)
    if (!foundRecipe) {
      throw new NotFoundError('Recept nenalezen')
    }
    return await recipeRepository.updateRecipe(id, recipe)
  }

  const deleteRecipe = async (id: string) => {
    const foundRecipe = await recipeRepository.getRecipeById(id)
    if (!foundRecipe) {
      throw new NotFoundError('Recept nenalezen')
    }
    return await recipeRepository.deleteRecipe(id)
  }

  return { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe }
}
