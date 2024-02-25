import { categoryRepository } from './repositories/category.repository'
import { categoryService } from './services/category.services'
import { categoryControllerFactory } from './controllers/category.controller'
import { categoryRouterFactory } from './routers/category.router'

export const categoryModule = () => {
  const repository = categoryRepository()
  const service = categoryService(repository)
  const controller = categoryControllerFactory(service)
  const router = categoryRouterFactory(controller)

  return router
}
