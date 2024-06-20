import { Box, Flex } from '@chakra-ui/react'
import { Footer } from '../Components/Footer/Footer.tsx'
import { Header } from '../Components/Header/Header.tsx'
import { RecipeList } from '../Components/Homepage/RecipeList.tsx'
import { useState } from 'react'
import { type Category } from '../Components/Header/Dropdown.tsx'

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
