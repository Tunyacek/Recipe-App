import { Box, Flex, Text } from '@chakra-ui/react'
import { Header } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'

export function Titlepage() {
  return (
    <Box bg="#d0ffd5">
      <Box ml="5px">
        <Header />
      </Box>
      <Box bg="#B0EBB4" height="80px" mt="10px" />
      <Box minHeight="75.7vh" bg="#f3fff4">
        <Flex justifyContent="center" alignItems="center" height="400px">
          <Text fontSize="100px">🐋Whalecum💦</Text>
        </Flex>
      </Box>

      <Footer />
    </Box>
  )
}
