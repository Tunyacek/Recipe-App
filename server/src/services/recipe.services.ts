import { recipeRepository } from "../repositories/recipe.repository";


const getAllRecipes = async () => {
    return await recipeRepository.getAllRecipes()
}

const getRecipeById = async (id: string) => {
    return await recipeRepository.getRecipeById(id)
}

const createRecipe = async (recipe: any) => {
    return await recipeRepository.createRecipe(recipe)
}

const updateRecipe = async (recipe: any) => {
    return await recipeRepository.updateRecipe(recipe)
}

const deleteRecipe = async (id: string) => {
    return await recipeRepository.deleteRecipe(id)
    }

export const recipeService = {getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe}