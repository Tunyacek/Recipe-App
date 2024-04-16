import express, { Express, Request, Response } from 'express'
import { errorHandler } from './middleware'
import { recipeModule } from './domains/recipe/recipe.module'
import { categoryModule } from './domains/category/category.module'
import { imageModule } from './domains/image/image.module'
import 'dotenv/config'
import cors from 'cors'

const app: Express = express()
const port = process.env.PORT || 3000

const recipeAPI = recipeModule()
const categoryAPI = categoryModule()
const imageAPI = imageModule()

app.use(express.json())
app.use(cors({ origin: process.env.FE_URL }))

app.use('/recipes', recipeAPI)
app.use('/categories', categoryAPI)
app.use('/upload', imageAPI)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
