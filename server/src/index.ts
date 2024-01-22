import express, { Express, Request, Response } from "express";
import 'dotenv/config';
import cors from "cors";
import { recipeControlller } from "./controllers/recipe.controller";




const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FE_URL }));


app.get("/api", async (req: Request, res: Response) => {
  res.send("Meowdy Everybunny");
});

app.get("/recipes", recipeControlller.getAllRecipes);

app.get("/recipes/:id", recipeControlller.getRecipeById);

app.post("/recipes", recipeControlller.createRecipe);

app.patch("/recipes/:id", recipeControlller.updateRecipe);

app.delete("/recipes/:id", recipeControlller.deleteRecipe);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});