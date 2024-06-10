import express, { Express } from 'express'
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
;(async () => {
  const imageRouter = await imageAPI
  app.use('/images', imageRouter)
})()

app.use('/recipes', recipeAPI)
app.use('/categories', categoryAPI)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
