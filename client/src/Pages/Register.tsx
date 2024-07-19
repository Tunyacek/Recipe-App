import { Box, Flex, FormLabel, Input, Text } from '@chakra-ui/react'
import { HeaderLogo } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'
import { PasswordInput } from '../Components/Login_and_Register/PasswordInput'
import { BackButton, RegisterSubmit } from '../Components/Shared/Buttons/Button'
import { Link } from 'react-router-dom'

export function RegisterForm() {
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
            Registrace
          </Text>
        </Flex>
        <Flex direction="column" gap="3" m="20px">
          <FormLabel>Emailová adresa</FormLabel>
          <Input
            type="email"
            borderColor="#9acc9c"
            width="400px"
            bg="white"
            focusBorderColor="#9acc9c"
          />
          <FormLabel>Heslo</FormLabel>
          <PasswordInput />
        </Flex>
        <Box ml="350px" mt="30px">
          <RegisterSubmit />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
