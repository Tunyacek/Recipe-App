import express, { Express, Request, Response } from 'express'
import { errorHandler } from './middleware'
import { recipeModule } from './modules/recipe.module'
import 'dotenv/config'
import cors from 'cors'

const app: Express = express()
const port = process.env.PORT || 3000

const recipeAPI = recipeModule()

app.use(express.json())
app.use(cors({ origin: process.env.FE_URL }))

app.use('/recipes', recipeAPI)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
