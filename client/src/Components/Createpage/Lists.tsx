import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { Bean, BeanOff, BookMinus, BookPlus } from 'lucide-react'
import { useState } from 'react'

const ZERO = 0
const ONE = 1

export function IngredientList() {
  const [ingredientList, setIngredientList] = useState<{ item: string }[]>([])
  const [ingredientInput, setIngredientInput] = useState('')

  const addIngredient = () => {
    const newIngredient = {
      item: ingredientInput,
    }

    setIngredientList([...ingredientList, newIngredient])
    setIngredientInput('')
  }

  const deleteIngredient = (index: number) => {
    const newIngredientList = [...ingredientList]
    newIngredientList.splice(index, ONE)
    setIngredientList(newIngredientList)
  }

  return (
    <Box pb="5" mr="15px">
      <FormControl isRequired>
        <FormLabel fontWeight="semibold">Ingredience</FormLabel>
        <InputGroup>
          <Input
            bg={'white'}
            onChange={(e) => setIngredientInput(e.target.value)}
            value={ingredientInput}
          />
          <InputRightElement>
            <Button onClick={addIngredient} bg="#9acc9c" _hover={{ background: '#8cb88d' }}>
              <Icon as={Bean} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {ingredientList.length > ZERO && (
        <UnorderedList styleType="none" border="1px solid #e9e8e8" borderRadius="5px" margin="10px">
          {ingredientList.map((item, index) => (
            <ListItem
              bg={'white'}
              key={index}
              borderBottom="1px solid #e9e8e8"
              padding="5px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {item.item}
              <Button onClick={() => deleteIngredient(index)} variant="ghost" colorScheme="red">
                <Icon as={BeanOff} />
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  )
}

export function InstructionList() {
  const [instructionList, setInstructionList] = useState<{ item: string }[]>([])
  const [instructionInput, setInstructionInput] = useState('')

  const addInstruction = () => {
    const newInstruction = {
      item: instructionInput,
    }

    setInstructionList([...instructionList, newInstruction])
    setInstructionInput('')
  }

  const deleteInstruction = (index: number) => {
    const newInstructionList = [...instructionList]
    newInstructionList.splice(index, ONE)
    setInstructionList(newInstructionList)
  }
  return (
    <Box pb="5" mr="15px">
      <FormControl isRequired>
        <FormLabel fontWeight="semibold">Instrukce</FormLabel>
        <InputGroup>
          <Input
            bg={'white'}
            onChange={(e) => setInstructionInput(e.target.value)}
            value={instructionInput}
          />
          <InputRightElement>
            <Button onClick={addInstruction} bg="#9acc9c" _hover={{ background: '#8cb88d' }}>
              <Icon as={BookPlus} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {instructionList.length > ZERO && (
        <UnorderedList styleType="none" border="1px solid #e9e8e8" borderRadius="5px" margin="10px">
          {instructionList.map((item, index) => (
            <ListItem
              bg={'white'}
              key={index}
              borderBottom="1px solid #e9e8e8"
              padding="5px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {item.item}
              <Button onClick={() => deleteInstruction(index)} variant="ghost" colorScheme="red">
                <Icon as={BookMinus} />
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  )
}
