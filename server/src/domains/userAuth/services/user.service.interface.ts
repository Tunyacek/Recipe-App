import { Token, Users } from '@prisma/client'

export interface UserService {
  authenticatedUser: (userId: string) => Promise<Users>
  createToken: (userId: string, accessToken: string) => Promise<Token>
  findToken: (userId: string, token: string) => Promise<Token | null>
  deleteToken: (userId: string, token: string) => Promise<void>
}
