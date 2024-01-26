import { recipeRepository } from "../repositories/recipe.repository";
import { Request } from "express";


const getAllRecipes = async () => {
    return recipeRepository.getAllRecipes()
}

const getRecipeById = async (id: string) => {
    return  recipeRepository.getRecipeById(id)
}

const createRecipe = async (recipe: any) => {
    return recipeRepository.createRecipe(recipe)
}

const updateRecipe =async (recipe: any) => {
    return recipeRepository.updateRecipe(recipe)
}

const deleteRecipe = async (id: string) => {
    return  recipeRepository.deleteRecipe(id)
    }

export const recipeService = {getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe}