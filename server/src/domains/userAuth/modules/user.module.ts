import { authenticatedUserControllerFactory } from '../controllers/user.controller'
import { loginRepositoryFactory } from '../repositories/login.repository'
import { authenticatedUserRouterFactory } from '../routers/user.router'
import { authenticatedUserServiceFactory } from '../services/user.service'

export const authenticatedUserModule = () => {
  const repository = loginRepositoryFactory()
  const service = authenticatedUserServiceFactory(repository)
  const controller = authenticatedUserControllerFactory(service)
  const router = authenticatedUserRouterFactory(controller)

  return router
}
