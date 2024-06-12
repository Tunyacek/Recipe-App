import { Heading, Box, Flex, Spacer, Icon } from '@chakra-ui/react'
import { CreateButton } from './Button.tsx'
import { Searchbar } from './Searchbar.tsx'
import { Dropdown } from './Dropdown.tsx'
import { Dessert } from 'lucide-react'

const LOGO_SIZE1 = 15
const LOGO_SIZE2 = 35

const logoSize = [LOGO_SIZE1, LOGO_SIZE1, LOGO_SIZE2]

export function Header() {
  return (
    <Box as="section">
      <Box height="200px">
        <Flex pl="5px" pb="10px" bg="#BFF6C3" align="center" pr="10px">
          <HeaderLogo />
          <Spacer />
          <Box pt="30px">
            <CreateButton />
          </Box>
        </Flex>
        <Flex pt="5" bg="#B0EBB4" height="80px">
          <Box pl="15px">
            <Searchbar />
          </Box>
          <Spacer />
          <Box pr="15px">
            <Dropdown />
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export function HeaderLogo() {
  return (
    <>
      <Heading as="h1" pl="15px" pt="10px" fontSize={logoSize}>
        <Icon as={Dessert} w={16} h={16} /> Nom Nom Nation
      </Heading>
    </>
  )
}
