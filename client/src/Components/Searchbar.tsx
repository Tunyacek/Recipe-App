import { Icon, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import { Search } from 'lucide-react'

export function Searchbar() {
  return (
    <Stack>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={Search} color="gray.500" />
        </InputLeftElement>
        <Input bg="white" placeholder="Vyhledávání receptu" width={['375px', '375px', '600px']} />
      </InputGroup>
    </Stack>
  )
}
