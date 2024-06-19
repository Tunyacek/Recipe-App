import { Box, Flex } from '@chakra-ui/react'
import { Footer } from '../Components/Footer'
import { Recipe } from '../Components/Recipe'
import { HeaderLogo } from '../Components/Header'

export function Recipepage() {
  return (
    <Flex direction="column" minHeight="100vh" bg="#f3fff4">
      <Box bg="#BFF6C3">
        <HeaderLogo />
      </Box>
      <Box bg="#B0EBB4" height="20px" />
      <Box flex="1">
        <Recipe />
      </Box>
      <Footer />
    </Flex>
  )
}
