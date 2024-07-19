import { Box, Text, Input, Flex, FormLabel } from '@chakra-ui/react'
import { HeaderLogo } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'
import { PasswordInput } from '../Components/Login_and_Register/PasswordInput'
import { BackButton, LoginSubmit } from '../Components/Shared/Buttons/Button'
import { Link } from 'react-router-dom'

export function LoginForm() {
  return (
    <Box bg="#d0ffd5">
      <Box ml="5px">
        <HeaderLogo />
      </Box>
      <Box bg="#B0EBB4" height="80px" mt="10px">
        <Link to={`/`}>
          <BackButton />
        </Link>
      </Box>
      <Box minHeight="75.7vh" bg="#f3fff4">
        <Flex>
          <Text as="b" fontSize="30px" m="20px">
            Přihlášení
          </Text>
        </Flex>
        <form>
          <Flex direction="column" gap="3" m="20px">
            <FormLabel>Emailová adresa</FormLabel>
            <Input
              type="email"
              width="400px"
              borderColor="#9acc9c"
              bg="white"
              focusBorderColor="#9acc9c"
            />
            <FormLabel>Heslo</FormLabel>
            <PasswordInput />
          </Flex>
          <Box ml="350px" mt="30px">
            <LoginSubmit />
          </Box>
        </form>
      </Box>
      <Footer />
    </Box>
  )
}
