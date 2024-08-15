import {
  Box,
  Text,
  Input,
  Flex,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react'
import { HeaderLogo } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'
import { BackButton, LoginSubmit } from '../Components/Shared/Buttons/Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function LoginForm() {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

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
      <Box
        minHeight="75.7vh"
        bg="#f3fff4"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Flex>
          <Text as="b" fontSize="30px" m="20px">
            Přihlášení
          </Text>
        </Flex>
        <form>
          <Flex direction="column" gap="3" m="20px">
            <Box>
              <FormLabel>Uživatelské jméno</FormLabel>
              <Input width="400px" borderColor="#9acc9c" bg="white" focusBorderColor="#9acc9c" />
            </Box>
            <Box>
              <FormLabel>Heslo</FormLabel>
              <InputGroup size="md" width="400px">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  borderColor="#9acc9c"
                  focusBorderColor="#9acc9c"
                  bg="white"
                />
                <InputRightElement width="6rem" pr="8px">
                  <Button
                    h="1.75rem"
                    width="100px"
                    size="xl"
                    onClick={handleClick}
                    bg="#9acc9c"
                    _hover={{ background: '#8cb88d' }}
                  >
                    {show ? 'Skrýt' : 'Zobrazit'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </Flex>
          <Box ml="175px" mt="30px">
            <LoginSubmit />
          </Box>
        </form>
      </Box>
      <Footer />
    </Box>
  )
}
