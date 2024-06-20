import { Box, Flex } from '@chakra-ui/react'
import { Footer } from '../Components/Footer/Footer'
import { Recipe } from '../Components/Recipepage/Recipe'
import { HeaderLogo } from '../Components/Header/Header'
import { BackButton } from '../Components/Buttons/Button'
import { Link } from 'react-router-dom'

export function Recipepage() {
  return (
    <Flex direction="column" minHeight="100vh" bg="#f3fff4">
      <Box bg="#BFF6C3">
        <Box ml="5px">
          <HeaderLogo />
        </Box>
        <Box bg="#B0EBB4" height="80px" mt="10px">
          <Link to={`/recipes`}>
            <BackButton />
          </Link>
        </Box>
      </Box>
      <Box flex="1">
        <Recipe />
      </Box>
      <Footer />
    </Flex>
  )
}
