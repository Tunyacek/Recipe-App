import { Request, Response, NextFunction } from 'express'
import { ExpressControllerFn } from '../../../lib/utils'
import { LoginService } from '../services/login.service.interface'
import { generateAccessToken, generateRefreshToken } from '../../../lib/jwt'
import { StatusCodes } from 'http-status-codes'

type LoginControllerFactory = (service: LoginService) => {
  checkUser: ExpressControllerFn
}

export const loginControllerFactory: LoginControllerFactory = (service: LoginService) => {
  const checkUser = async (req: Request, res: Response, _next: NextFunction) => {
    const { username, password } = req.body
    const user = await service.checkUser(username, password)
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED)
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(StatusCodes.OK).json({ message: 'User log in successfull' })
  }

  return { checkUser }
}
