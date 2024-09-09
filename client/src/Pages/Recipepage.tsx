import { Box, Flex, Spacer } from '@chakra-ui/react'
import { Footer } from '../Components/Shared/Footer/Footer'
import { Recipe } from '../Components/Recipepage/Recipe'
import { Header } from '../Components/Shared/Header/Header'
import { BackButton, CreateButton } from '../Components/Shared/Buttons/Button'
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuth } from '../lib/redux/authSlice.ts'
import { useSelector } from 'react-redux'
import { type RootState } from '../lib/redux/store.ts'

export function Recipepage() {
  const [redirect, setRedirect] = useState(false)

  const auth = useSelector((state: RootState) => state.auth.value)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }

        const response = await axios.get('/authentication/user')
        if (response.status === 200 && response.data) {
          dispatch(setAuth(true))
        } else {
          setRedirect(true)
          dispatch(setAuth(false))
        }
      } catch (error) {
        console.error('Authentication failed:', error)
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
        <Flex direction="row" alignItems="center" height="100%">
          <Box ml="5px">
            <Link to="/recipes">
              <Header />
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
