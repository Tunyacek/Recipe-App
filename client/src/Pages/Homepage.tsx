import { Box } from '@chakra-ui/react'
import { Footer } from '../Components/Footer'
import { Header } from '../Components/Header'
import { RecipeList } from '../Components/RecipeCard'

export function Homepage() {
  return (
    <>
      <Box bg="#f3fff4">
        <Header />
        <RecipeList />
        <Footer />
      </Box>
    </>
  )
}
