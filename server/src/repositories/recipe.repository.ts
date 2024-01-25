import { prisma } from "../lib/prisma";
import { Request } from "express";


const getAllRecipes = async () => {
 const allRecipes = await prisma.recipe.findMany()
 return allRecipes
}

const getRecipeById = async (id: string) => {
  const recipeById = await prisma.recipe.findUnique({ where: { id: id } });
  return recipeById
};

const createRecipe = async (recipe: any)  => {
  const { title, summary, ingredients, instructions, rating, image_url, prep_time, cook_time } = recipe;
  const createdRecipe = await prisma.recipe.create({
    data: {
      title,
      summary,
      ingredients,
      instructions,
      rating,
      image_url,
      prep_time,
      cook_time
    }
  });
  return createdRecipe
}

const updateRecipe = async (recipe: any) => {
  const { title, summary, ingredients, instructions, rating, image_url, prep_time, cook_time } = recipe;
  const updatedRecipe = await prisma.recipe.update ({
    where: {
      id: recipe
    },
    data: {
      title,
      summary,
      ingredients,
      instructions,
      rating,
      image_url,
      prep_time,
      cook_time
    }
  });
  return updatedRecipe
}

const deleteRecipe = async (id: string) => {
  await prisma.recipe.delete({ where: { id: id } });
};

export const recipeRepository = {getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe}
