import { Request, Response } from "express";
import { recipeService } from "../services/recipe.services"

const getAllRecipes = async (req: Request, res: Response) => {
    const allRecipes = await recipeService.getAllRecipes()
    return res.json(allRecipes)
}

const getRecipeById = async (req: Request , res: Response ) => {
    const recipeResult = await recipeService.getRecipeById(req.params.id)
    return res.json(recipeResult)
}
 
const createRecipe = async (req: Request, res: Response) => {
    const id = req.params.id;
    const createdRecipe = await recipeService.createRecipe({id, ...req.body})
    return res.json(createdRecipe)
}

const updateRecipe = async (req:Request, res: Response) => {
    const id = req.params.id;
    const updatedRecipe = await recipeService.updateRecipe({id, ...req.body})
    return res.json(updatedRecipe)
}

const deleteRecipe = async (req: Request , res: Response) => {
    const id = req.params.id;
    await recipeService.deleteRecipe(id)
    return res.json({ message: "Recept úspěšně smazán." });
}

export const recipeControlller = {getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe}