import { type Response, type Request, type NextFunction } from 'express'
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken'
import { decode } from 'jsonwebtoken'
import { Role } from '../common/accountRoles'

export const authorize =
  (role?: Role) => async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    try {
      if (!authHeader) {
        throw new Error('Authorization header is missing')
      }
      const token = authHeader.split(' ')[1]
      const SECRET = process.env.ACCESS_TOKEN_SECRET as string
      if (token === null)
        return res.status(401).send({ message: 'Unauthorized' })
      jwt.verify(token, SECRET, (err, user) => {
        if (err != null) {
          if (err instanceof TokenExpiredError) {
            return res
              .status(403)
              .send({ message: 'Token has expired, please sign in again' })
          }
          return res.status(403).send({ message: 'Invalid token signature' })
        }
        const decoded: JwtPayload = decode(token) as JwtPayload
        if (role) {
          if (decoded !== null && decoded.role !== role) {
            return res.status(401).send({ message: 'Permission denied' })
          }
        }
        next()
      })
    } catch (err) {
      const msg =
        err instanceof Error ? 'Unauthorized. ' + err.message : 'Unauthorized'
      return res.status(401).send({ message: msg })
    }
  }
