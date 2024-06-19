import { Box, Flex } from '@chakra-ui/react'
import { Footer } from '../Components/Footer'
import { Header } from '../Components/Header'
import { RecipeList } from '../Components/RecipeList'
import { useState } from 'react'
import { type Category } from '../Components/Dropdown.tsx'

export function Homepage() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [searchRecipe, setSearchRecipe] = useState('')

  const handleCategoryChange = (categories: Category[]) => {
    setSelectedCategories(categories)
  }

  const handleSearchChange = (recipe: string) => {
    setSearchRecipe(recipe)
  }

  return (
    <Flex direction="column" minHeight="100vh" bg="#f3fff4">
      <Header onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
      <Box flex="1">
        <RecipeList selectedCategories={selectedCategories} searchRecipe={searchRecipe} />
      </Box>
      <Footer />
    </Flex>
  )
}
