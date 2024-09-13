import { Token } from '@prisma/client'

export interface UserRepository {
  createToken: (userId: string, accessToken: string) => Promise<Token>
  findToken: (userId: string, token: string) => Promise<Token | null>
  deleteToken: (userId: string, token: string) => Promise<void>
}
