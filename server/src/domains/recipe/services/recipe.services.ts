import { RecipeRepository } from '../repositories/recipe.repository.interface'
import { RecipeSchema } from '../schemas/recipe.schema'
import { NotFoundError, UnprocessableEntityError } from '../../../lib/errors'
import { CategoryService } from '../../category/services/category.services.interface'

export const recipeService = (
  recipeRepository: RecipeRepository,
  categoryService: CategoryService
) => {
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
    const categoryExists = await categoryService.getCategoryById(recipe.categoryId)
    if (!categoryExists) {
      throw new UnprocessableEntityError('Category does not exist')
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
