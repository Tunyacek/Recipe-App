import { prisma } from '../../../lib/prisma'
import { RegisterSchema } from '../schemas/register.schema'
import { Users } from '@prisma/client'
import { RegisterRepository } from './register.repository.interface'

export const registerRepositoryFactory = (): RegisterRepository => {
  const createUser = async (user: RegisterSchema): Promise<Users> => {
    const { email, username, password } = user
    const createdUser = await prisma.users.create({
      data: {
        email,
        username,
        password,
      },
    })
    return createdUser
  }
  return { createUser }
}
