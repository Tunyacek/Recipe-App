import express, { Express,} from "express";
import { recipeControlller } from "../controllers/recipe.controller";
import cors from "cors";

const app: Express = express();

app.use(cors({ origin: process.env.FE_URL }));

const getAllRecipesRouter = express.Router()
const getRecipeByIdRouter = express.Router()
const createRecipeRouter = express.Router()
const updateRecipeRouter = express.Router()
const deleteRecipeRouter = express.Router()




getAllRecipesRouter.get("/recipes", recipeControlller.getAllRecipes);

getRecipeByIdRouter.get("/recipes/:id", recipeControlller.getRecipeById);

createRecipeRouter.post("/recipes", recipeControlller.createRecipe);

updateRecipeRouter.patch("/recipes/:id", recipeControlller.updateRecipe);

deleteRecipeRouter.delete("/recipes/:id", recipeControlller.deleteRecipe);


export  const recipeRouter = {getAllRecipesRouter, getRecipeByIdRouter, createRecipeRouter, updateRecipeRouter, deleteRecipeRouter }