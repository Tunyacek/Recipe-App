import { Token } from '@prisma/client'

export interface UserRepository {
  createToken: (userId: string) => Promise<Token>
  findToken: (userId: string, token: string) => Promise<Token>
  deleteToken: (userId: string, token: string) => Promise<void>
}
