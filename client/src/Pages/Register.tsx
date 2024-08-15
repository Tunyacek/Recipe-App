import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react'
import { HeaderLogo } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'
import { BackButton, RegisterSubmit } from '../Components/Shared/Buttons/Button'
import { Link, Navigate } from 'react-router-dom'
import { type FormEvent, useState } from 'react'
import axios from 'axios'

const url = import.meta.env.VITE_BE_URL

const THREE_THOUSAND = 3000

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (passwordConfirm !== password) {
      toast({
        title: 'Hesla se neshodují',
        description: 'Zkontrolujte, zda se vaše hesla shodují.',
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      return
    }

    try {
      await axios.post(`${url}/register`, {
        email,
        username,
        password,
      })

      setRedirect(true)
    } catch (error) {
      console.error('Error occurred during registration:', error)
      toast({
        title: 'ZKONTROLUJ DATABAZI NA EMAIL A USERNAME A NAPIŠ ERROR',
        description: 'Nastala chyba při registraci. Zkuste to prosím znovu.',
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
    }
  }
  if (redirect) {
    return <Navigate to="/login" />
  }

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
            Registrace
          </Text>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3" m="20px">
            <Box>
              <FormLabel>Emailová adresa</FormLabel>
              <Input
                type="email"
                borderColor="#9acc9c"
                width="400px"
                bg="white"
                focusBorderColor="#9acc9c"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Uživatelské jméno</FormLabel>
              <Input
                borderColor="#9acc9c"
                width="400px"
                bg="white"
                focusBorderColor="#9acc9c"
                onChange={(e) => setUsername(e.target.value)}
              />
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
                  onChange={(e) => setPassword(e.target.value)}
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
            <Box>
              <FormLabel>Kontrola hesla</FormLabel>
              <InputGroup size="md" width="400px">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  borderColor="#9acc9c"
                  focusBorderColor="#9acc9c"
                  bg="white"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
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
          <Box ml="160px" mt="30px">
            <RegisterSubmit />
          </Box>
        </form>
      </Box>
      <Footer />
    </Box>
  )
}
