import type { Request, Response, NextFunction } from 'express'
import { BaseCustomError } from './lib/errors'
import multer from 'multer'
import dotenv from 'dotenv'
import { verify } from 'jsonwebtoken'
import { authenticatedUserServiceFactory } from './domains/userAuth/services/user.service'
import { loginRepositoryFactory } from './domains/userAuth/repositories/login.repository'
import { authenticatedUserRepositoryFactory } from './domains/userAuth/repositories/user.repository'

dotenv.config()

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof BaseCustomError) {
    return res.status(err.statusCode).json({
      error: { message: err.message },
    })
  }

  res.status(500).json({
    error: { message: 'Something went wrong' },
  })
}

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

const accessSecret = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1] || ''
    if (!token) {
      return res.status(401).json({ message: 'Přístup odepřen: Nebyl nalezen žádný token' })
    }

    const payload = verify(token, accessSecret) as { id: string }
    if (!payload) {
      return res.status(401).json({ message: 'Přístup odepřen: Špatný token' })
    }

    const loginRepository = loginRepositoryFactory()
    const userRepository = authenticatedUserRepositoryFactory()

    const userService = authenticatedUserServiceFactory(loginRepository, userRepository)
    const user = await userService.authenticatedUser(payload.id)

    if (!user) {
      return res.status(401).json({ message: 'Přístup odepřen: Uživatel nenalezen' })
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    next()
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Neautentikováno: Špatný token nebo uživatel neautentikován' })
  }
}
