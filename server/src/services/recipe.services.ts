import { recipeRepository } from "../repositories/recipe.repository";
import { Request } from "express";


const getAllRecipes = async () => {
    return recipeRepository.getAllRecipes()
}

const getRecipeById = async (id: string) => {
    return  recipeRepository.getRecipeById(id)
}

const createRecipe = async (req: Request) => {
    return recipeRepository.createRecipe(req.body)
}

const updateRecipe =async (req:Request) => {
    return recipeRepository.updateRecipe(req.body)
}

const deleteRecipe = async (id: string) => {
    return  recipeRepository.deleteRecipe(id)
    }

export const recipeService = {getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe}