import express from 'express'
import userRoutes from './src/routes/user.routes'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/users', userRoutes)

export default app
