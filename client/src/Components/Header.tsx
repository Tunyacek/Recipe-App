import { Heading, Box, Flex, Spacer, useBreakpointValue, Image } from '@chakra-ui/react'
import { CreateButton } from './Button.tsx'
import { Searchbar } from './Searchbar.tsx'
import { Dropdown } from './Dropdown.tsx'
import { type Category } from './Dropdown.tsx'
import catImage from '../assets/kitty.png'

const LOGO_SIZE1 = 15
const LOGO_SIZE2 = 35

const logoSizes = [LOGO_SIZE1, LOGO_SIZE1, LOGO_SIZE2]

interface HeaderProps {
  onCategoryChange: (selectedCategories: Category[]) => void
  onSearchChange: (searchRecipe: string) => void
}

export function Header({ onCategoryChange, onSearchChange }: HeaderProps) {
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
        <Box bg="#B0EBB4" height={['130px', '130px', '80px']}>
          <Flex direction={flexDisplayDirection} alignItems="center" height="100%">
            <Box
              pl="15px"
              flex="1"
              sx={{
                '@media screen and (max-width: 767px)': {
                  pt: '20px',
                },
              }}
            >
              <Searchbar onSearchChange={onSearchChange} />
            </Box>
            <Spacer />
            <Box pr="15px">
              <Dropdown onCategoryChange={onCategoryChange} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export function HeaderLogo() {
  return (
    <>
      <Heading as="h1" pl="15px" pt="10px" fontSize={logoSizes}>
        <Image src={catImage} w={16} h={16} />
      </Heading>
    </>
  )
}
