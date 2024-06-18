import { Box } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

export interface Category {
  id: string
  title: string
}

interface DropdownProps {
  onCategoryChange: (selectedCategories: Category[]) => void
}

const url = import.meta.env.VITE_BE_URL

export function Dropdown({ onCategoryChange }: DropdownProps) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}categories`)
        const formattedCategories = response.data.map((category: Category) => ({
          value: category.id,
          label: category.title,
        }))
        setCategories(formattedCategories)
      } catch (error) {
        console.error('Error fetching categories', error)
      }
    }

    fetchCategories()
  }, [])

  const animatedComponents = makeAnimated() // animated API

  const handleChange = (selectedOptions: any) => {
    const selectedCategories = selectedOptions.map((option: any) => ({
      id: option.value,
      title: option.label,
    }))
    onCategoryChange(selectedCategories)
  }

  return (
    <Box
      width="600px"
      sx={{
        '@media screen and (max-width: 1272px)': {
          width: '450px',
        },
        '@media screen and (max-width: 1996px)': {
          width: '450px',
        },
        '@media screen and (max-width: 1147px)': {
          width: '300px',
        },
        '@media screen and (max-width: 767px)': {
          width: '375px',
          pb: '20px',
          ml: '30px',
        },
      }}
    >
      <Select
        placeholder="Kategorie"
        options={categories}
        isMulti
        closeMenuOnSelect={false}
        components={animatedComponents}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: '#9acc9c',
            primary: '#9acc9c',
          },
        })}
        onChange={handleChange}
      />
    </Box>
  )
}
