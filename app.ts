import express from 'express'
import userRoutes from './src/routes/user.routes'
import authRoutes from './src/routes/auth.routes'
import bookRoutes from './src/routes/book.routes'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/users', userRoutes)
app.use('/', authRoutes)
app.use('/books', bookRoutes)

export default app
