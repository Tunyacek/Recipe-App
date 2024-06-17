import { Icon, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import { Search } from 'lucide-react'

export function Searchbar() {
  return (
    <Stack>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={Search} color="gray.500" />
        </InputLeftElement>
        <Input
          bg="white"
          placeholder="Vyhledávání receptu"
          focusBorderColor="#9acc9c"
          sx={{
            '@media screen and (max-width: 1272px)': {
              width: '600px',
              ml: '0px',
            },
            '@media screen and (max-width: 1996px)': {
              width: '600px',
              ml: '0px',
            },
            '@media screen and (max-width: 1147px)': {
              width: '300px',
              ml: '0px',
            },
            '@media screen and (max-width: 767px)': {
              width: '375px',
              ml: '0px',
            },
          }}
        />
      </InputGroup>
    </Stack>
  )
}
