import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import 'dotenv/config'
import { StatusCodes } from 'http-status-codes'
import { UserService } from '../services/user.service.interface'
import { generateAccessToken } from '../../../lib/jwt'

const accessSecret = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'pleasewritemeindotenv'

export const authenticatedUserControllerFactory = (userService: UserService) => {
  const authenticatedUser = async (req: Request, res: Response) => {
    try {
      const acessToken = req.header('Authorization')?.split(' ')[1] || ''
      if (!acessToken) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Access token chybí',
        })
      }

      const payload = verify(acessToken, accessSecret) as { id: string }
      if (!payload) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Access token je neplatný',
        })
      }

      const user = await userService.authenticatedUser(payload.id)
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Uživatel nenalezen',
        })
      }

      const { password, ...data } = user
      return res.send(data)
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: 'Chybný access token',
      })
    }
  }

  const refresh = async (req: Request, res: Response) => {
    try {
      const cookie = req.cookies['refresh_token']

      const payload = verify(cookie, refreshSecret) as { id: string }

      if (!payload) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Refresh token chybí',
        })
      }

      const existingToken = await userService.findToken(payload.id, cookie)
      if (!existingToken) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Refresh token neexistuje nebo je neplatný',
        })
      }

      const token = generateAccessToken(payload.id)

      res.status(StatusCodes.OK).send({
        token,
      })
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: 'Chybný refresh token',
      })
    }
  }

  const logout = async (req: Request, res: Response) => {
    try {
      const token = req.cookies['refresh_token']

      if (!token) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          message: 'No refresh token found',
        })
      }

      const payload = verify(token, refreshSecret) as { id: string }
      if (!payload) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Invalid token',
        })
      }

      await userService.deleteToken(payload.id, token)

      res.cookie('refresh_token', '', { maxAge: 0 })

      return res.status(StatusCodes.OK).send({
        message: 'Logout successful',
      })
    } catch (error) {
      console.error('Logout error: ', error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Logout failed',
      })
    }
  }

  return { authenticatedUser, refresh, logout }
}
