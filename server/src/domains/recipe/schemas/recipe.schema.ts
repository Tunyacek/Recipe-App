import { z } from 'zod'

const rating = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'] as const

export const recipeSchema = z.object({
  title: z.string(),
  summary: z.string(),
  ingredients: z.string(),
  instructions: z.string(),
  rating: z.enum(rating),
  image_url: z.string(),
  prep_time: z.number(),
  cook_time: z.number(),
})

export type RecipeSchema = z.infer<typeof recipeSchema>
