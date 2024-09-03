import { Box, Flex } from '@chakra-ui/react'
import { SubmitForm } from '../Components/Createpage/SubmitForm'
import { Footer } from '../Components/Shared/Footer/Footer'
import { Link, Navigate } from 'react-router-dom'
import { BackButton } from '../Components/Shared/Buttons/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../Components/Shared/Header/Header'
import { useDispatch } from 'react-redux'
import { setAuth } from '../lib/redux/authSlice.ts'
import { type RootState } from '../lib/redux/store.ts'
import { useSelector } from 'react-redux'

export function Createpage() {
  const [redirect, setRedirect] = useState(false)
  const auth = useSelector((state: RootState) => state.auth.value)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get('/authentication/user')
        dispatch(setAuth(true))
      } catch (error) {
        setRedirect(true)
        dispatch(setAuth(false))
      }
    }

    fetchData()
  }, [])

  if (redirect) {
    return <Navigate to="/login" />
  }

  if (!auth) {
    return <Navigate to="/login" />
  }

  return (
    <Flex direction="column" minHeight="100vh" bg="#f3fff4">
      <Box bg="#d0ffd5">
        <Box ml="5px" mb="10px">
          <Header />
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
