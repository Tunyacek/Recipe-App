import express, { Express } from 'express'
import { errorHandler } from './middleware'
import { recipeModule } from './domains/recipe/recipe.module'
import { categoryModule } from './domains/category/category.module'
import { imageModule } from './domains/image/image.module'
import { registerModule } from './domains/userAuth/modules/register.module'
import { loginModule } from './domains/userAuth/modules/login.module'
import { authenticatedUserModule } from './domains/userAuth/modules/user.module'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app: Express = express()
const port = process.env.PORT || 3000

const recipeAPI = recipeModule()
const categoryAPI = categoryModule()
const imageAPI = imageModule()
const registerAPI = registerModule()
const loginAPI = loginModule()
const userAPI = authenticatedUserModule()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: process.env.FE_URL, credentials: true }))
;(async () => {
  app.use('/images', await imageAPI)
})()
app.use('/recipes', recipeAPI)
app.use('/categories', categoryAPI)
app.use('/register', registerAPI)
app.use('/login', loginAPI)
app.use('/authentication', userAPI)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
