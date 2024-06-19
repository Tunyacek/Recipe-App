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
} from '@chakra-ui/react'

import axios from 'axios'
import { useEffect, useState } from 'react'

const ZERO = 0

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

interface RecipeListProps {
  selectedCategories: Category[]
  searchRecipe: string
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Box
      sx={{
        '@media screen and (max-width: 699px)': {
          pl: '70px',
        },
        '@media screen and (max-width: 659px)': {
          pl: '50px',
        },
        '@media screen and (max-width: 619px)': {
          pl: '30px',
        },
        '@media screen and (max-width: 569px)': {
          pl: '0px',
        },
      }}
    >
      <Card
        maxWidth={['500px', '500px', '450px']}
        minWidth={['200px', '200px', '250px']}
        height={['500px', '500px', '650px']}
      >
        <CardBody>
          <Box>
            <Flex justifyContent="center">
              <Image
                objectFit="cover"
                src={recipe.image_url}
                width={['250px', '250px', '400px']}
                height={['175px', '175px', '300px']}
                alt={recipe.title}
                borderRadius="lg"
              />
            </Flex>
            <Stack mt="6" spacing="3">
              <Heading
                size="md"
                textAlign="center"
                fontSize="23px"
                sx={{
                  '@media screen and (max-width: 1583px)': {
                    fontSize: '18px',
                  },
                  '@media screen and (max-width: 766px)': {
                    fontSize: '14px',
                  },
                  '@media screen and (max-width: 699px)': {
                    fontSize: '23px',
                  },
                }}
              >
                {recipe.title}
              </Heading>
              <Divider />
              <Text
                noOfLines={5}
                fontSize="19px"
                sx={{
                  '@media screen and (max-width: 1520px)': {
                    fontSize: '16px',
                  },
                  '@media screen and (max-width: 1150px)': {
                    fontSize: '12px',
                  },
                  '@media screen and (max-width: 699px)': {
                    fontSize: '14px',
                  },
                }}
              >
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

export const RecipeList: React.FC<RecipeListProps> = ({ selectedCategories, searchRecipe }) => {
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

  if (loading) {
    return <div>Načítám...</div>
  }

  const filteredRecipes = recipes
    .filter((recipe) =>
      selectedCategories.length > ZERO
        ? recipe.categoryId.some((categoryRel) =>
            selectedCategories.some((category) => category.id === categoryRel.category.id)
          )
        : true
    )
    .filter((recipe) => recipe.title.toLowerCase().includes(searchRecipe.toLowerCase()))

  if (filteredRecipes.length === 0) {
    return (
      <Flex justifyContent="center">
        <Box>
          <Text fontSize="30px" mt="40px">
            Recepty nenalezeny🥺
          </Text>
        </Box>
      </Flex>
    )
  }

  return (
    <Box mb="20px" ml="10px">
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={3}
        sx={{
          '@media screen and (max-width: 1385px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
          '@media screen and (max-width: 1067px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media screen and (max-width: 699px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
          },
        }}
      >
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Grid>
    </Box>
  )
}
