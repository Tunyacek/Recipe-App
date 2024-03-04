import { recipeService } from './services/recipe.services'
import { recipeRepository } from './repositories/recipe.repository'
import { recipeControllerFactory } from './controllers/recipe.controller'
import { recipeRouterFactory } from './routers/recipe.router'
import { categoryValidationService } from '../category-recipe.module'

export const recipeModule = () => {
  const repository = recipeRepository()
  const service = recipeService(repository, categoryValidationService)
  const controller = recipeControllerFactory(service)
  const router = recipeRouterFactory(controller)

  return router
}
