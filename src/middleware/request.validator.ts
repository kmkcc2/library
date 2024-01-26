import { type NextFunction, type Request, type Response } from 'express'
import { checkSchema, validationResult, type Schema } from 'express-validator'
import { type DefaultSchemaKeys } from 'express-validator/src/middlewares/schema'

export const validateRequest = (validation: Schema<DefaultSchemaKeys>) => async (req: Request, res: Response, next: NextFunction) => {
  const validationChain = checkSchema(validation)
  await Promise.all(validationChain.map(async validation => { await validation.run(req) }))
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
