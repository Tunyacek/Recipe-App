import { Box, Flex } from '@chakra-ui/react'
import { SubmitForm } from '../Components/Createpage/SubmitForm'
import { HeaderLogo } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'
import { Link, Navigate } from 'react-router-dom'
import { BackButton } from '../Components/Shared/Buttons/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function Createpage() {
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
        <Box ml="5px" mb="10px">
          <Link to="/recipes">
            <HeaderLogo />
          </Link>
        </Box>
      </Box>
      <Box bg="#B0EBB4" height="80px">
        <Link to={`/recipes`}>
          <BackButton />
        </Link>
      </Box>
      <Box flex="1">
        <SubmitForm />
      </Box>
      <Footer />
    </Flex>
  )
}
