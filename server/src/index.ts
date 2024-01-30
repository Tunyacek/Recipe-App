import express, { Express, Request, Response } from 'express'
import { recipeRouter } from './routers/recipe.router'
import { errorHandler } from './middleware'
import 'dotenv/config'
import cors from 'cors'

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: process.env.FE_URL }))

app.get('/api', async (req: Request, res: Response) => {
  res.send('Meowdy Everybunny')
})

app.use('/recipes', recipeRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
