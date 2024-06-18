import { Box } from '@chakra-ui/react'
import { Footer } from '../Components/Footer'
import { Header } from '../Components/Header'
import { RecipeList } from '../Components/RecipeList'
import { useState } from 'react'
import { type Category } from '../Components/Dropdown.tsx'

export function Homepage() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  const handleCategoryChange = (categories: Category[]) => {
    setSelectedCategories(categories)
  }

  return (
    <Box bg="#f3fff4">
      <Header onCategoryChange={handleCategoryChange} />
      <RecipeList selectedCategories={selectedCategories} />
      <Footer />
    </Box>
  )
}
