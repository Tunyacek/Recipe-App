import express, { Express, Request, Response } from 'express'
import { errorHandler } from './middleware'
import { recipeModule } from './domains/recipe/recipe.module'
import { imageModule } from './domains/image/image.module'
import 'dotenv/config'
import cors from 'cors'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const app: Express = express()
const port = process.env.PORT || 3000

const recipeAPI = recipeModule()

const imageAPI = imageModule()

app.use(express.json())
app.use(cors({ origin: process.env.FE_URL }))

app.use('/recipes', recipeAPI)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
