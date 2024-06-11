import { Heading, Box, Flex, Spacer, Icon } from '@chakra-ui/react'
import { CreateButton } from './Button.tsx'
import { Searchbar } from './Searchbar.tsx'
import { Dropdown } from './Dropdown.tsx'
import { Dessert } from 'lucide-react'

export function Header() {
  return (
    <Box as="section">
      <Box height="200px">
        <Flex pr="65px" pb="10px" bg="#BFF6C3">
          <HeaderLogo />
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
      <Heading as="h1" pl="15px" pt="10px">
        <Icon as={Dessert} w={16} h={16} /> Nom Nom Nation
      </Heading>
      <Spacer pb="15px" />
    </>
  )
}
