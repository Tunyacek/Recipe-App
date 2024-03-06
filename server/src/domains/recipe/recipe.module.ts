import { recipeServiceFactory } from './services/recipe.services'
import { recipeRepositoryFactory } from './repositories/recipe.repository'
import { recipeControllerFactory } from './controllers/recipe.controller'
import { recipeRouterFactory } from './routers/recipe.router'
import { categoryRepository } from '../shared/shared.module'

export const recipeModule = () => {
  const recipeRepository = recipeRepositoryFactory()
  const service = recipeServiceFactory(recipeRepository, categoryRepository)
  const controller = recipeControllerFactory(service)
  const router = recipeRouterFactory(controller)

  return router
}
