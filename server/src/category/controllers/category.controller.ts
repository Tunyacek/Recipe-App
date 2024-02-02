import { Request, Response } from 'express'
import { categoryService } from '../services/category.services'

const getAllCategories = async (req: Request, res: Response) => {
  const allRecipes = await categoryService.getAllCategories()
  return res.json(allRecipes)
}

const getCategoryById = async (req: Request, res: Response) => {
  const recipeResult = await categoryService.getCategoryById(req.params.id)
  return res.json(recipeResult)
}

const createCategory = async (req: Request, res: Response) => {
  const id = req.params.id
  const createdRecipe = await categoryService.createCategory({ id, ...req.body })
  return res.json(createdRecipe)
}

const updateCategory = async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedRecipe = await categoryService.updateCategory({ id, ...req.body })
  return res.json(updatedRecipe)
}

const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id
  await categoryService.deleteCategory(id)
  return res.json({ message: 'Recept úspěšně smazán.' })
}

export const recipeControlller = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}
