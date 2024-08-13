import { loginControllerFactory } from '../controllers/login.controller'
import { loginRepositoryFactory } from '../repositories/login.repository'
import { loginRouterFactory } from '../routers/login.router'
import { loginServiceFactory } from '../services/login.service'

export const loginModule = () => {
  const repository = loginRepositoryFactory()
  const service = loginServiceFactory(repository)
  const controller = loginControllerFactory(service)
  const router = loginRouterFactory(controller)

  return router
}
