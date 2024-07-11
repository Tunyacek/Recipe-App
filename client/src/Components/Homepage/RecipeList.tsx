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
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
        sx={{
          '@media screen and (max-width: 1385px)': {
            width: '500px',
            height: '500px',
          },
          '@media screen and (max-width: 1067px)': {
            width: '450px',
            height: '500px',
          },
          '@media screen and (max-width: 960px)': {
            width: '400px',
            height: '500px',
          },
          '@media screen and (max-width: 860px)': {
            width: '380px',
            height: '500px',
          },
          '@media screen and (max-width: 820px)': {
            width: '360px',
            height: '500px',
          },
          '@media screen and (max-width: 790px)': {
            width: '340px',
            height: '500px',
          },
          '@media screen and (max-width: 740px)': {
            width: '300px',
            height: '500px',
          },
          '@media screen and (max-width: 699px)': {
            width: '475px',
            height: '500px',
          },
        }}
        my="5px"
        mx="5px"
      >
        <Link to={`/recipes/${recipe.id}`}>
          <CardBody>
            <Box>
              <Flex justifyContent="center">
                <Image
                  objectFit="cover"
                  src={recipe.image_url}
                  sx={{
                    '@media screen and (max-width: 1385px)': {
                      width: '400px',
                      height: '300px',
                    },
                    '@media screen and (max-width: 1067px)': {
                      width: '250px',
                      height: '175px',
                    },

                    '@media screen and (max-width: 699px)': {
                      width: '250px',
                      height: '175px',
                    },
                  }}
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
                    '@media screen and (max-width: 1385px)': {
                      fontSize: '18px',
                    },
                    '@media screen and (max-width: 1067px)': {
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
                  textAlign="center"
                  height="100px"
                  sx={{
                    '@media screen and (max-width: 1385px)': {
                      fontSize: '16px',
                    },
                    '@media screen and (max-width: 1067px)': {
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
        </Link>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" mb="50px" display={'flex'} flexWrap={'wrap'}>
            {recipe.categoryId?.map((categoryRel, index) => (
              <Button
                color="#f8fae5"
                key={index}
                variant="solid"
                bg="#9acc9c"
                _hover={{ background: '#8cb88d' }}
                marginBottom="5px"
                sx={{
                  '@media screen and (max-width: 740px)': {
                    width: '100px',
                    height: '20px',
                    fontSize: '10px',
                  },
                  '@media screen and (max-width: 699px)': {
                    width: '150px',
                    height: '30px',
                    fontSize: '15px',
                  },
                }}
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
        const response = await axios.get(`${url}/recipes`)
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

  if (filteredRecipes.length === ZERO) {
    return (
      <Flex justifyContent="center">
        <Box>
          <Text fontSize="30px" mt="40px">
            Recepty nenalezeny🥺
          </Text>
          <Text m="10px" fontSize="20px">
            Co se stalo?
          </Text>
          <UnorderedList>
            <ListItem m="10px">Název neodpovídá žádnému receptu</ListItem>
            <ListItem m="10px">Kategorie nemá žádné recepty</ListItem>
            <ListItem m="10px">Recepty byly smazány</ListItem>
            <ListItem m="10px">Chyba u nás na serveru, nebo v komunikaci se serverem</ListItem>
          </UnorderedList>
        </Box>
      </Flex>
    )
  }

  return (
    <Box my="20px" ml="10px">
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
