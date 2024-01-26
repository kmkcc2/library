import { type Response, type Request, type NextFunction } from 'express'
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken'
import { decode } from 'jsonwebtoken'

export function authorizeUserOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  try {
    if (!authHeader) {
      throw new Error('Authorization header is missing')
    }
    const token = authHeader.split(' ')[1]
    const SECRET = process.env.ACCESS_TOKEN_SECRET as string
    if (token === null) return res.status(401).send({ message: 'Unauthorized' })
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
      if (
        decoded !== null &&
        Object.prototype.hasOwnProperty.call(decoded, 'role') &&
        decoded.role !== 'user'
      ) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      next()
    })
  } catch (err) {
    const msg =
      err instanceof Error ? 'Unauthorized. ' + err.message : 'Unauthorized'
    return res.status(401).send({ message: msg })
  }
}
export function authorizeAdminOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  try {
    if (!authHeader) {
      throw new Error('Authorization header is missing')
    }
    const token = authHeader.split(' ')[1]
    const SECRET = process.env.ACCESS_TOKEN_SECRET as string
    if (token === null) return res.status(401).send({ message: 'Unauthorized' })
    jwt.verify(token, SECRET, (err, user) => {
      if (err !== null) {
        if (err instanceof TokenExpiredError) {
          return res
            .status(403)
            .send({ message: 'Token has expired, please sign in again' })
        }
        return res.status(403).send({ message: 'Invalid token signature' })
      }
      const decoded: JwtPayload = decode(token) as JwtPayload
      if (
        decoded !== null &&
        Object.prototype.hasOwnProperty.call(decoded, 'role') &&
        decoded.role !== 'admin'
      ) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      next()
    })
  } catch (err) {
    const msg =
      err instanceof Error ? 'Unauthorized. ' + err.message : 'Unauthorized'
    return res.status(401).send({ message: msg })
  }
}

export function authorizeAdminOrUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  try {
    if (!authHeader) {
      throw new Error('Authorization header is missing')
    }
    const token = authHeader.split(' ')[1]
    const SECRET = process.env.ACCESS_TOKEN_SECRET as string
    if (token === null) return res.status(401).send({ message: 'Unauthorized' })
    jwt.verify(token, SECRET, (err, user) => {
      if (err !== null) {
        if (err instanceof TokenExpiredError) {
          return res
            .status(403)
            .send({ message: 'Token has expired, please sign in again' })
        }
        return res.status(403).send({ message: 'Invalid token signature' })
      }
      next()
    })
  } catch (err) {
    const msg =
      err instanceof Error ? 'Unauthorized. ' + err.message : 'Unauthorized'
    return res.status(401).send({ message: msg })
  }
}
