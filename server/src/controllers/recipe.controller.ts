import { Request, Response } from "express";
import { recipeService } from "../services/recipe.services"

const getAllRecipes = async (req: Request, res: Response) => {
    const allRecipes = recipeService.getAllRecipes()
    return res.json(allRecipes)
}

const getRecipeById = async (req: Request , res: Response ) => {
    const recipeResult = recipeService.getRecipeById(req.params.id)
    return res.json(recipeResult)
    
  }
  
  const createRecipe = async (req: Request, res: Response) => {
    const createdRecipe = recipeService.createRecipe(req.body)
    return res.json(createdRecipe)
  }
  
  const updateRecipe = async (req:Request, res: Response) => {
    const updatedRecipe = recipeService.updateRecipe(req.body)
    return res.json(updatedRecipe)
  }
  
  const deleteRecipe = async (req: Request , res: Response) => {
    const id = req.params.id;
    await recipeService.deleteRecipe(id)
    
    return res.json({ message: "Recept úspěšně smazán." });
  }

export const recipeControlller = {getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe}