import { Box, Flex, FormControl, FormLabel, HStack, Input, Textarea } from '@chakra-ui/react'
import { AddImage, SubmitRecipe } from '../Buttons/Button.tsx'
import { useState, type ChangeEvent } from 'react'
import { InstructionList, IngredientList } from './Lists.tsx'
import Rating from './Rating.tsx'

interface FormValues {
  title: string
  summary: string
  category: string
  prep_time: string
  cook_time: string
  image_url: string
}

const ZERO = 0

export const SubmitForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    title: '',
    summary: '',
    category: '',
    prep_time: '',
    cook_time: '',
    image_url: '',
  })

  const [rating, setRating] = useState<number>(ZERO)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleImageUpload = (filePath: string) => {
    setValues({ ...values, image_url: filePath })
  }

  return (
    <Box>
      <Box bg="#B0EBB4" height="80px" />
      <form action="/recipes/" method="POST">
        <Flex direction="column" maxW="600px" pt="15px" pl="15px">
          <Box pb="5" mr="15px">
            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Název</FormLabel>
              <Input bg={'white'} name="title" onChange={handleInputChange} value={values.title} />
            </FormControl>
          </Box>
          <Box pb="5" mr="15px">
            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Shrnutí</FormLabel>
              <Textarea
                bg={'white'}
                name="summary"
                onChange={handleInputChange}
                value={values.summary}
                minHeight="150px"
              />
            </FormControl>
          </Box>
          <IngredientList />
          <InstructionList />
          <Box pb="5" mr="15px">
            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Hodnocení</FormLabel>
              <Rating count={5} value={rating} edit={true} onChange={(value) => setRating(value)} />
            </FormControl>
          </Box>
          <Box pb="5" mr="15px">
            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Kategorie</FormLabel>
              <Input
                bg={'white'}
                name="category"
                onChange={handleInputChange}
                value={values.category}
              />
            </FormControl>
          </Box>
          <Box pb="5" mr="15px">
            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Obrázek</FormLabel>
              <AddImage onUpload={handleImageUpload} />
            </FormControl>
          </Box>
          <HStack pb="5">
            <Box pr="15px" mr="15px">
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">Čas přípravy</FormLabel>
                <Input
                  bg={'white'}
                  name="prep_time"
                  onChange={handleInputChange}
                  value={values.prep_time}
                />
              </FormControl>
            </Box>
            <Box pl="15px" mr="15px">
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">Čas vaření</FormLabel>
                <Input
                  bg={'white'}
                  name="cook_time"
                  onChange={handleInputChange}
                  value={values.cook_time}
                />
              </FormControl>
            </Box>
          </HStack>
          <Box ml="auto" mr="15px" pb="5">
            <SubmitRecipe />
          </Box>
        </Flex>
      </form>
    </Box>
  )
}
