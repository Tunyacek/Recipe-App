import { Box, Flex, Spacer, useBreakpointValue, Image } from '@chakra-ui/react'
import { CreateButton } from '../Buttons/Button.tsx'
import { Searchbar } from './Searchbar.tsx'
import { Dropdown } from '../Header/Dropdown.tsx'
import { type Category } from '../Header/Dropdown.tsx'
import catImage from '../../assets/logo_cream.jpeg'
import { Link } from 'react-router-dom'

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
  // bg="#d0ffd5"
  return (
    <Box as="section">
      <Box height={['250px', '250px', '200px']}>
        <Flex pl="5px" pb="10px" bg="#d0ffd5" align="center" pr="10px">
          <HeaderLogo />
          <Spacer />
          <Box pt="30px">
            <Link to="/add-recipe">
              <CreateButton />
            </Link>
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
    <Box>
      <Link to="/recipes">
        <Image src={catImage} width="100px" height="100px" />
      </Link>
    </Box>
  )
}
