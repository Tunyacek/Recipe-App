/* eslint-disable react/prop-types */

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Text,
  Grid,
  Stack,
  Button,
  ButtonGroup,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react'

import axios from 'axios'
import { useEffect, useState } from 'react'

interface Category {
  id: string
  title: string
}

interface Recipe {
  id: string
  image_url: string
  title: string
  summary: string
  categoryId: { category: Category }[]
}

interface RecipeCardProps {
  recipe: Recipe
}
interface Category {
  id: string
  title: string
}

//card sizes

const CARD_HEIGHT1 = 500
const CARD_HEIGHT2 = 650
const CARD_WIDTH1 = 450
const CARD_WIDTH2 = 435

const cardHeights = [CARD_HEIGHT1, CARD_HEIGHT1, CARD_HEIGHT2]
const cardWidths = [CARD_WIDTH1, CARD_WIDTH1, CARD_WIDTH2]

//image sizes

const IMAGE_HEIGHT1 = 175
const IMAGE_HEIGHT2 = 300
const IMAGE_WIDTH1 = 250
const IMAGE_WIDTH2 = 400

const imageHeights = [IMAGE_HEIGHT1, IMAGE_HEIGHT1, IMAGE_HEIGHT2]
const imageWidths = [IMAGE_WIDTH1, IMAGE_WIDTH1, IMAGE_WIDTH2]

//font sizes

const TEXT_SIZE1 = 15
const TEXT_SIZE2 = 20
const HEADING_SIZE1 = 20
const HEADING_SIZE2 = 25

const textSize = [TEXT_SIZE1, TEXT_SIZE1, TEXT_SIZE2]
const headingSize = [HEADING_SIZE1, HEADING_SIZE1, HEADING_SIZE2]

const NUMBER_OF_LINES1 = 1
const NUMBER_OF_LINES2 = 2
const NUMBER_OF_LINES3 = 3
const NUMBER_OF_LINES4 = 4
const NUMBER_OF_LINES5 = 5

const textNoOfLines = [
  NUMBER_OF_LINES1,
  NUMBER_OF_LINES2,
  NUMBER_OF_LINES3,
  NUMBER_OF_LINES4,
  NUMBER_OF_LINES5,
]

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Box ml="15px" mb="15px">
      <Card width={cardWidths} h={cardHeights}>
        <CardBody>
          <Box>
            <Flex justifyContent="center">
              <Image
                objectFit="cover"
                src={recipe.image_url}
                width={imageWidths}
                height={imageHeights}
                alt={recipe.title}
                borderRadius="lg"
              />
            </Flex>
            <Stack mt="6" spacing="3">
              <Heading size="md" textAlign="center" fontSize={headingSize}>
                {recipe.title}
              </Heading>
              <Divider />
              <Text noOfLines={textNoOfLines} fontSize={textSize}>
                {recipe.summary}
              </Text>
            </Stack>
          </Box>
        </CardBody>

        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" mb={'50px'}>
            {recipe.categoryId?.map((categoryRel, index) => (
              <Button
                color="#f8fae5"
                key={index}
                variant="solid"
                bg="#9acc9c"
                _hover={{ background: '#8cb88d' }}
              >
                {categoryRel.category.title}
              </Button>
            ))}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  )
}

const url = import.meta.env.VITE_BE_URL

export const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${url}recipes`)
        setRecipes(response.data)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(4, 1fr)',
  })

  if (loading) {
    return <div>Načítám...</div>
  }

  return (
    <Box mb="20px">
      <Grid templateColumns={gridTemplateColumns} gap={1}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Grid>
    </Box>
  )
}
