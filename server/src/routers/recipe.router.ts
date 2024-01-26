import express, { Router } from "express";
import express, { Router } from "express";
import { recipeControlller } from "../controllers/recipe.controller";

export const recipeRouter: Router = express.Router();

recipeRouter.get("/", recipeControlller.getAllRecipes);

export const recipeRouter: Router = express.Router();

recipeRouter.get("/", recipeControlller.getAllRecipes);

recipeRouter.get("/:id", recipeControlller.getRecipeById);
recipeRouter.get("/:id", recipeControlller.getRecipeById);

recipeRouter.post("/", recipeControlller.createRecipe);
recipeRouter.post("/", recipeControlller.createRecipe);

recipeRouter.patch("/:id", recipeControlller.updateRecipe);
recipeRouter.patch("/:id", recipeControlller.updateRecipe);

recipeRouter.delete("/:id", recipeControlller.deleteRecipe);



recipeRouter.delete("/:id", recipeControlller.deleteRecipe);