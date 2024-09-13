import { UnauthorizedError } from '../../../lib/errors'
import { LoginRepository } from '../repositories/login.repository.interface'
import { UserRepository } from '../repositories/user.repository.interface'

export const authenticatedUserServiceFactory = (
  loginRepository: LoginRepository,
  userRepository: UserRepository
) => {
  const authenticatedUser = async (userId: string) => {
    const user = await loginRepository.findUserById(userId)
    if (!user) {
      throw new UnauthorizedError('Neautentikováno')
    }
    return user
  }

  const createToken = async (userId: string, accessToken: string) => {
    return await userRepository.createToken(userId, accessToken)
  }

  const findToken = async (userId: string, token: string) => {
    return await userRepository.findToken(userId, token)
  }

  const deleteToken = async (userId: string, token: string) => {
    await userRepository.deleteToken(userId, token)
  }

  return { authenticatedUser, createToken, findToken, deleteToken }
}
