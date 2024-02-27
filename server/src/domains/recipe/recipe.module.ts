import { recipeService } from './services/recipe.services'
import { recipeRepository } from './repositories/recipe.repository'
import { recipeControllerFactory } from './controllers/recipe.controller'
import { recipeRouterFactory } from './routers/recipe.router'
import { categoryService } from '../category/services/category.services'
import { categoryRepository } from '../category/repositories/category.repository'

export const recipeModule = () => {
  const repository = recipeRepository()
  const categoryRepo = categoryRepository()
  const categorySvc = categoryService(categoryRepo)
  const service = recipeService(repository, categorySvc)
  const controller = recipeControllerFactory(service)
  const router = recipeRouterFactory(controller)

  return router
}
