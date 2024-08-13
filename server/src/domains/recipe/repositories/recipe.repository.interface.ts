import { RecipeSchema } from '../schemas/recipe.schema'
import { Recipe } from '@prisma/client'

export interface RecipeRepository {
  getAllRecipes: () => Promise<Recipe[]>
  getRecipeById: (id: string) => Promise<Recipe | null>
  createRecipe: (recipe: RecipeSchema, userId: string) => Promise<Recipe>
  updateRecipe: (id: string, recipe: RecipeSchema, userId: string) => Promise<Recipe>
  deleteRecipe: (id: string) => Promise<void>
}
