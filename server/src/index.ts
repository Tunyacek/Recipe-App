import express, { Express, Request, Response } from "express";
import 'dotenv/config';
import { recipeRouter  } from "./routers/recipe.router";





const app: Express = express();
const port = process.env.PORT || 3000;




app.get("/api", async (req: Request, res: Response) => {
  res.send("Meowdy Everybunny");
});

app.use(recipeRouter.getAllRecipesRouter)
app.use(recipeRouter.getRecipeByIdRouter)
app.use(recipeRouter.createRecipeRouter)
app.use(recipeRouter.updateRecipeRouter)
app.use(recipeRouter.deleteRecipeRouter)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});