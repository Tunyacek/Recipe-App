/* eslint-disable react/prop-types */
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import axios from 'axios'
import { Box, Flex, FormControl, FormLabel, HStack, useToast } from '@chakra-ui/react'
import { SubmitRecipeButton } from '../Buttons/Button'
import { InstructionList, IngredientList, CategoryList } from './ListInputs'
import Rating from './Rating'
import { CookTimeInput, PrepTimeInput, SummaryInput, TitleInput } from './SingleInputs'
import { ImageInput } from './ImageInput'

interface FormValues {
  title: string
  summary: string
  prep_time: number
  cook_time: number
  image_url: string
  rating: Rating
  ingredients: string[]
  instructions: string[]
  categoryId: string[]
}

const ZERO = 0
const THREE_THOUSAND = 3000
const ONE = 1
const TWO = 2
const THREE = 3
const FOUR = 4
const FIVE = 5

type Rating = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'

interface Category {
  id: string
  title: string
  created_at: string
  updated_at: string
}

const url = import.meta.env.VITE_BE_URL

export const SubmitForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    title: '',
    summary: '',
    prep_time: ZERO,
    cook_time: ZERO,
    image_url: '',
    rating: 'ONE',
    ingredients: [],
    instructions: [],
    categoryId: [],
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [rating, setRating] = useState<number>(ZERO)
  const [ingredientList, setIngredientList] = useState<string[]>([])
  const [instructionList, setInstructionList] = useState<string[]>([])
  const [categoryList, setCategoryList] = useState<string[]>([])
  const toast = useToast()

  const handlePrepTimeChange = (_valueAsString: string, valueAsNumber: number) => {
    setValues((prevValues) => ({ ...prevValues, prep_time: valueAsNumber }))
  }

  const handleCookTimeChange = (_valueAsString: string, valueAsNumber: number) => {
    setValues((prevValues) => ({ ...prevValues, cook_time: valueAsNumber }))
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/categories`)
        setCategories(response.data)
      } catch (err) {
        const error = err as Error
        toast({
          title: 'Chyba při načítání kategorií.',
          description: error.message,
          status: 'error',
          duration: THREE_THOUSAND,
          isClosable: true,
        })
      }
    }
    fetchCategories()
  }, [toast])

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { valueAsString: string; valueAsNumber: number },
    field?: string
  ) => {
    if ('target' in event) {
      const { name, value } = event.target
      setValues((prevValues) => ({ ...prevValues, [name]: value }))
    } else if (field) {
      setValues((prevValues) => ({ ...prevValues, [field]: event.valueAsNumber }))
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[ZERO]
    if (file) {
      setImageFile(file)
    }
  }

  const handleImageUpload = async (): Promise<string> => {
    if (!imageFile) {
      return ''
    }

    const formData = new FormData()
    formData.append('file', imageFile)

    try {
      const response = await axios.post(`${url}/images`, formData)
      return response.data.path
    } catch (err) {
      const error = err as Error
      toast({
        title: 'Nahrávání obrázku selhalo.',
        description: error.message,
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      throw error
    }
  }

  const createCategoryIfNotExists = async (categoryTitle: string): Promise<string> => {
    const existingCategory = categories.find(
      (category) => category.title.toLowerCase() === categoryTitle.toLowerCase()
    )
    if (existingCategory) {
      return existingCategory.id
    }

    try {
      const response = await axios.post(`${url}/categories`, { title: categoryTitle })
      const newCategory = response.data
      setCategories((prevCategories) => [...prevCategories, newCategory])
      return newCategory.id
    } catch (err) {
      const error = err as Error
      toast({
        title: 'Chyba při vytváření kategorie.',
        description: error.message,
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      throw error
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const convertRatingToEnum = (rating: number): Rating => {
      switch (rating) {
        case ONE:
          return 'ONE'
        case TWO:
          return 'TWO'
        case THREE:
          return 'THREE'
        case FOUR:
          return 'FOUR'
        case FIVE:
          return 'FIVE'
        default:
          throw new Error(`Invalid rating value: ${rating}`)
      }
    }

    if (categoryList.length === ZERO) {
      toast({
        title: 'Kategorie jsou povinné.',
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      return
    }

    if (ingredientList.length === ZERO) {
      toast({
        title: 'Ingredience jsou povinné.',
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      return
    }

    if (instructionList.length === ZERO) {
      toast({
        title: 'Instrukce jsou povinné.',
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
      return
    }

    try {
      const imageUrl = await handleImageUpload()

      const categoryIds = await Promise.all(
        categoryList.map((category) => createCategoryIfNotExists(category))
      )

      const data = {
        ...values,
        image_url: imageUrl,
        rating: convertRatingToEnum(rating),
        ingredients: ingredientList,
        instructions: instructionList,
        categoryId: categoryIds,
      }
      console.log(data)
      await axios.post(`${url}/recipes`, data)

      toast({
        title: 'Recept úspěšně přidán.',
        status: 'success',
        duration: THREE_THOUSAND,
        isClosable: true,
      })

      setValues({
        title: '',
        summary: '',
        prep_time: ZERO,
        cook_time: ZERO,
        image_url: '',
        rating: 'ONE',
        ingredients: [],
        instructions: [],
        categoryId: [],
      })
      setImageFile(null)
      setRating(ZERO)
      setIngredientList([])
      setInstructionList([])
      setCategoryList([])
    } catch (err) {
      const error = err as Error
      toast({
        title: 'Nastala chyba.',
        description: error.message,
        status: 'error',
        duration: THREE_THOUSAND,
        isClosable: true,
      })
    }
  }

  return (
    <Box>
      <Box bg="#B0EBB4" height="80px" />
      <form onSubmit={handleSubmit}>
        <Flex direction="column" maxW="600px" pt="15px" pl="15px">
          <Box pb="5" mr="15px">
            <FormControl isRequired>
              <TitleInput value={values.title} onChange={handleInputChange} />
            </FormControl>
          </Box>
          <Box pb="5" mr="15px">
            <FormControl isRequired>
              <SummaryInput value={values.summary} onChange={handleInputChange} />
            </FormControl>
          </Box>
          <Box pb="5" mr="15px">
            <ImageInput onChange={handleFileChange} />
          </Box>
          <IngredientList ingredientList={ingredientList} setIngredientList={setIngredientList} />
          <InstructionList
            instructionList={instructionList}
            setInstructionList={setInstructionList}
          />
          <Box pb="5" mr="15px">
            <FormControl isRequired>
              <FormLabel fontWeight="semibold">Hodnocení</FormLabel>
              <Rating count={5} value={rating} edit={true} onChange={(value) => setRating(value)} />
            </FormControl>
          </Box>
          <CategoryList categoryList={categoryList} setCategoryList={setCategoryList} />
          <Box pb="5" mr="15px">
            <FormControl isRequired>
              <PrepTimeInput value={values.prep_time} onChange={handlePrepTimeChange} />
            </FormControl>
          </Box>

          <Box pb="5" mr="15px">
            <FormControl isRequired>
              <CookTimeInput value={values.cook_time} onChange={handleCookTimeChange} />
            </FormControl>
          </Box>
          <HStack>
            <SubmitRecipeButton />
          </HStack>
        </Flex>
      </form>
    </Box>
  )
}
