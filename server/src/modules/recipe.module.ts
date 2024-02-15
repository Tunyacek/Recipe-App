import { recipeService } from '../recipe/services/recipe.services'
import { recipeRepository } from '../recipe/repositories/recipe.repository'
import { recipeControllerFactory } from '../recipe/controllers/recipe.controller'
import { recipeRouterFactory } from '../routers/recipe.router'

export const recipeModule = () => {
  const repository = recipeRepository()
  const service = recipeService(repository)
  const controller = recipeControllerFactory(service)
  const router = recipeRouterFactory(controller)

  return router
}
