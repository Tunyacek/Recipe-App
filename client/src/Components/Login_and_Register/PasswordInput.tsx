import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import { useState } from 'react'

export function PasswordInput() {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md" width="400px">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        borderColor="#9acc9c"
        focusBorderColor="#9acc9c"
        bg="white"
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={handleClick}
          bg="#9acc9c"
          _hover={{ background: '#8cb88d' }}
        >
          {show ? 'Skrýt' : 'Zobrazit'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
