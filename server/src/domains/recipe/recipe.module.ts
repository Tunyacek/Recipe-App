import { recipeService } from './services/recipe.services'
import { recipeRepository } from './repositories/recipe.repository'
import { recipeControllerFactory } from './controllers/recipe.controller'
import { recipeRouterFactory } from './routers/recipe.router'

export const recipeModule = () => {
  const repository = recipeRepository()
  const service = recipeService(repository)
  const controller = recipeControllerFactory(service)
  const router = recipeRouterFactory(controller)

  return router
}
