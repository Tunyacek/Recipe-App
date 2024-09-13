import { prisma } from '../../../lib/prisma'

export const authenticatedUserRepositoryFactory = () => {
  const createToken = async (userId: string, accessToken: string) => {
    const expiredAt = new Date()
    expiredAt.setDate(expiredAt.getDate() + 7)
    console.log('token be', accessToken)
    return await prisma.token.create({
      data: {
        userId: userId,
        token: accessToken,
        expiredAt,
      },
    })
  }

  const findToken = async (userId: string, token: string) => {
    const foundToken = await prisma.token.findFirst({
      where: { userId, token: token, expiredAt: { gte: new Date() } },
    })

    return foundToken || null
  }

  const deleteToken = async (userId: string, token: string) => {
    await prisma.token.delete({
      where: { token: token, userId },
    })
  }

  return { createToken, findToken, deleteToken }
}
