import { z } from 'zod'

export const Recipe = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  ingredients: z.string(),
  instructions: z.string(),
  rating: z.number(),
  image_url: z.string(),
  prep_time: z.string(),
  cook_time: z.string(),
})
