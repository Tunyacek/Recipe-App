import { UnauthorizedError } from '../../../lib/errors'
import { LoginRepository } from '../repositories/login.repository.interface'

export const authenticatedUserServiceFactory = (loginRepository: LoginRepository) => {
  const authenticatedUser = async (userId: string) => {
    const user = await loginRepository.findUserById(userId)
    if (!user) {
      throw new UnauthorizedError('Neautentikováno')
    }
    return user
  }

  return { authenticatedUser }
}
