import { Heading, Box, Flex, Spacer, Icon, useBreakpointValue } from '@chakra-ui/react'
import { CreateButton } from './Button.tsx'
import { Searchbar } from './Searchbar.tsx'
import { Dropdown } from './Dropdown.tsx'
import { Dessert } from 'lucide-react'

//logo size
const LOGO_SIZE1 = 15
const LOGO_SIZE2 = 35

const logoSizes = [LOGO_SIZE1, LOGO_SIZE1, LOGO_SIZE2]

export function Header() {
  const flexDisplayDirection = useBreakpointValue<'column' | 'row'>({
    base: 'column',
    md: 'row',
    lg: 'row',
  })
  return (
    <Box as="section">
      <Box height={['250px', '250px', '200px']}>
        <Flex pl="5px" pb="10px" bg="#BFF6C3" align="center" pr="10px">
          <HeaderLogo />
          <Spacer />
          <Box pt="30px">
            <CreateButton />
          </Box>
        </Flex>

        <Flex pt="5" bg="#B0EBB4" height={['130px', '130px', '80px']} direction="column">
          <Flex direction={flexDisplayDirection} alignItems="center">
            <Box pl="15px" flex="1">
              <Searchbar />
            </Box>
            <Spacer />
            <Box pr="15px">
              <Dropdown />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export function HeaderLogo() {
  return (
    <>
      <Heading as="h1" pl="15px" pt="10px" fontSize={logoSizes}>
        <Icon as={Dessert} w={16} h={16} /> Nom Nom Nation
      </Heading>
    </>
  )
}
