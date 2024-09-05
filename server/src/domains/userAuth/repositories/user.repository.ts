import { prisma } from '../../../lib/prisma'
import { generateRefreshToken } from '../../../lib/jwt'

export const authenticatedUserRepositoryFactory = () => {
  const createToken = async (userId: string) => {
    const expiredAt = new Date()
    expiredAt.setDate(expiredAt.getDate() + 7)

    return await prisma.token.create({
      data: {
        userId: userId,
        token: generateRefreshToken(userId),
        expiredAt,
      },
    })
  }

  const findToken = async (userId: string, token: string) => {
    const foundToken = await prisma.token.findFirst({
      where: { userId, token, expiredAt: { gte: new Date() } },
    })

    if (!foundToken) {
      throw new Error('Token not found or expired')
    }

    return foundToken
  }
  const deleteToken = async (userId: string, token: string) => {
    await prisma.token.delete({
      where: { token, userId },
    })
  }

  return { createToken, findToken, deleteToken }
}
