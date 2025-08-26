import './dotenv'
import express from 'express'
import { PORT } from './constants/default'
import articlesRouter from './routes/articles'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/articles', articlesRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
