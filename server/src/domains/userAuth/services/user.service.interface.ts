import { Token, Users } from '@prisma/client'

export interface UserService {
  authenticatedUser: (userId: string) => Promise<Users>
  createToken: (userId: string) => Promise<Token>
  findToken: (userId: string, token: string) => Promise<Token>
  deleteToken: (userId: string, token: string) => Promise<void>
}
