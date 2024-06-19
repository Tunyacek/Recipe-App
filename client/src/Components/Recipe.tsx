import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  ListItem,
  OrderedList,
  Text,
  Image,
  Spacer,
} from '@chakra-ui/react'
import axios from 'axios'
import { CookingPot, Salad, StarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Category {
  id: string
  title: string
}

interface Recipe {
  id: string
  image_url: string
  title: string
  summary: string
  prep_time: number
  cook_time: number
  ingredients: string[]
  instructions: string[]
  categoryId: { category: Category }[]
}

const url = import.meta.env.VITE_BE_URL

export function Recipe() {
  const { id } = useParams<{ id: string }>()

  const [recipe, setRecipe] = useState<Recipe>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${url}recipes/${id}`)
        setRecipe(response.data)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  if (loading) {
    return <div>Načítám...</div>
  }

  if (!recipe) {
    return (
      <Flex justifyContent="center">
        <Box>
          <Text fontSize="30px" mt="40px">
            Recept nenalezen🥺
          </Text>
        </Box>
      </Flex>
    )
  }
  return (
    <Box>
      <Flex flexDirection="column" alignItems="center">
        <Image m="40px" src={recipe.image_url} width="600px" height="400px" borderRadius="xl" />

        <Heading m="10px">{recipe.title}</Heading>

        <Flex justifyContent="center" alignItems="center" m="15px" mb="30px">
          <Icon as={Salad} />
          <Text pl="5px" pr="15px">
            : {recipe.prep_time} min
          </Text>
          <Spacer width="10px" />
          <Icon as={CookingPot} />
          <Text pl="5px">: {recipe.cook_time} min</Text>
        </Flex>

        <Box textAlign="center" mb="40px">
          <Text fontWeight="bold" m="5px">
            Shrnutí
          </Text>
          <Text maxW="1000px">{recipe.summary}</Text>
        </Box>
      </Flex>

      <Flex justifyContent="center">
        <Text fontWeight="bold">Ingredience:</Text>
        <Box pt="15px">
          <OrderedList mt="10px" pl="20px">
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index} maxWidth="500px">
                {ingredient}
              </ListItem>
            ))}
          </OrderedList>
        </Box>

        <Text fontWeight="bold">Instrukce:</Text>
        <Box pt={'15px'}>
          <OrderedList mt="10px" pl="20px">
            {recipe.instructions.map((instruction, index) => (
              <ListItem key={index} maxWidth="500px">
                {instruction}
              </ListItem>
            ))}
          </OrderedList>
        </Box>
      </Flex>

      <Flex flexDirection="column" alignItems="center" mt="40px">
        <Box textAlign="center" mb="20px">
          <Text fontWeight="bold" fontSize="lg">
            Hodnocení
          </Text>
          <Box display="flex" justifyContent="center">
            <StarIcon color="gold" />
            <StarIcon color="gold" />
            <StarIcon color="gold" />
            <StarIcon color="gold" />
            <StarIcon color="gold" />
          </Box>
        </Box>
        <Box textAlign="center">
          <Text fontWeight="bold" mb="10px">
            Kategorie
          </Text>
          <ButtonGroup spacing="2" mb={'50px'}>
            {recipe.categoryId.map((categoryWrapper, index) => (
              <Button
                color="#f8fae5"
                key={index}
                variant="solid"
                bg="#9acc9c"
                _hover={{ background: '#8cb88d' }}
              >
                {categoryWrapper.category.title}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Flex>
    </Box>
  )
}
