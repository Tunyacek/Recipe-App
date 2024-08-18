import { Box, Flex } from '@chakra-ui/react'
import { Footer } from '../Components/Shared/Footer/Footer.tsx'
import { Header } from '../Components/Shared/Header/Header.tsx'
import { RecipeList } from '../Components/Homepage/RecipeList.tsx'
import { useEffect, useState } from 'react'
import { type Category } from '../Components/Shared/Header/Dropdown.tsx'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const url = import.meta.env.VITE_BE_URL

export function Homepage() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [searchRecipe, setSearchRecipe] = useState('')
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${url}/authentication/user`, { withCredentials: true })
      } catch (error) {
        setRedirect(true)
      }
    }

    fetchData()
  }, [])

  if (redirect) {
    return <Navigate to="/login" />
  }

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
