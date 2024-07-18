import { Box, ButtonGroup, Flex, Text } from '@chakra-ui/react'
import { HeaderLogo } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'
import { LoginRedirect, RegisterRedirect } from '../Components/Shared/Buttons/Button'
import { Link } from 'react-router-dom'

export function Titlepage() {
  return (
    <Box bg="#d0ffd5">
      <Box ml="5px">
        <HeaderLogo />
      </Box>
      <Box bg="#B0EBB4" height="80px" mt="10px"></Box>
      <Box minHeight="75.7vh" bg="#f3fff4">
        <Flex justifyContent="center" alignItems="center" height="400px">
          <Text fontSize="100px">🐋Whalecum💦</Text>
        </Flex>
        <Flex justifyContent="center" mt="40px">
          <ButtonGroup gap="2">
            <Link to="/register">
              <RegisterRedirect />
            </Link>
            <Link to="/login">
              <LoginRedirect />
            </Link>
          </ButtonGroup>
        </Flex>
      </Box>

      <Footer />
    </Box>
  )
}
