import { Box, Flex, Spacer } from '@chakra-ui/react'
import { Footer } from '../Components/Shared/Footer/Footer'
import { Recipe } from '../Components/Recipepage/Recipe'
import { HeaderLogo } from '../Components/Shared/Header/Header'
import { BackButton, CreateButton } from '../Components/Shared/Buttons/Button'
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function Recipepage() {
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`/authentication/user`)
      } catch (error) {
        setRedirect(true)
      }
    }

    fetchData()
  }, [])

  if (redirect) {
    return <Navigate to="/login" />
  }
  return (
    <Flex direction="column" minHeight="100vh" bg="#f3fff4">
      <Box bg="#d0ffd5">
        <Flex direction="row" alignItems="center" height="100%">
          <Box ml="5px">
            <Link to="/recipes">
              <HeaderLogo />
            </Link>
          </Box>
          <Spacer />
          <Box mr="5px" mt="30px">
            <Link to="/add-recipe">
              <CreateButton />
            </Link>
          </Box>
        </Flex>
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
