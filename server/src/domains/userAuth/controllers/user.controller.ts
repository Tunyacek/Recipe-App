import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import 'dotenv/config'
import { StatusCodes } from 'http-status-codes'
import { UserService } from '../services/user.service.interace'
import { generateAccessToken } from '../../../lib/jwt'

const accessSecret = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'pleasewritemeindotenv'

export const authenticatedUserControllerFactory = (userService: UserService) => {
  const authenticatedUser = async (req: Request, res: Response) => {
    try {
      const cookie = req.cookies['access_token']
      if (!cookie) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Access token chybí',
        })
      }

      const payload = verify(cookie, accessSecret) as { id: string }
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

      const newAccessToken = generateAccessToken(payload.id)

      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })

      res.status(StatusCodes.OK).send({
        message: 'V pořádku',
      })
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: 'Chybný refresh token',
      })
    }
  }

  const logout = async (_req: Request, res: Response) => {
    res.cookie('access_token', '', { maxAge: 0 })
    res.cookie('refresh_token', '', { maxAge: 0 })

    res.status(StatusCodes.OK).send({
      message: 'V pořádku',
    })
  }

  return { authenticatedUser, refresh, logout }
}
