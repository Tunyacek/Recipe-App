import { Box, Flex, Spacer, Image } from '@chakra-ui/react'
import { CreateButton, LoginRedirect, Logout } from '../Buttons/Button.tsx'
import logo from '../../../assets/logo_cream.jpeg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../lib/redux/store.ts'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../../lib/redux/authSlice.ts'

export function Header() {
  const auth = useSelector((state: RootState) => state.auth.value)

  const dispatch = useDispatch()

  const logout = async () => {
    await axios.post('authentication/logout', {}, { withCredentials: true })
    dispatch(setAuth(false))
  }

  let links

  if (auth) {
    links = (
      <Flex direction="column">
        <Box py="10px" display="flex" justifyContent="center">
          <Link to="/" onClick={logout}>
            <Logout />
          </Link>
        </Box>
        <Box>
          <Link to="/add-recipe">
            <CreateButton />
          </Link>
        </Box>
      </Flex>
    )
  } else {
    links = (
      <Flex direction="column">
        <Link to="/login">
          <LoginRedirect />
        </Link>
      </Flex>
    )
  }
  return (
    <Box as="header">
      <Box>
        <Flex pl="5px" pb="10px" bg="#d0ffd5" align="center" pr="10px">
          <Link to="/recipes">
            <HeaderLogo />
          </Link>
          <Spacer />
          {links}
        </Flex>
      </Box>
    </Box>
  )
}

export function HeaderLogo() {
  return (
    <Box>
      <Image src={logo} width="110px" height="110px" />
    </Box>
  )
}
