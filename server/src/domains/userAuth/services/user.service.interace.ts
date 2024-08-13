import { Users } from '@prisma/client'

export interface UserService {
  authenticatedUser: (userId: string) => Promise<Users>
}
