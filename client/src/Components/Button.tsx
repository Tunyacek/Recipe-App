/* eslint-disable react/prop-types */

import { Box, Button, ButtonGroup, Input } from '@chakra-ui/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { type ChangeEvent } from 'react'

const ZERO = 0

//createbutton size

const C_BUTTON_WIDTH1 = 160
const C_BUTTON_WIDTH2 = 200
const C_TEXT_SIZE1 = 13
const C_TEXT_SIZE2 = 15

const createButtonWidths = [C_BUTTON_WIDTH1, C_BUTTON_WIDTH1, C_BUTTON_WIDTH2]
const createTextSizes = [C_TEXT_SIZE1, C_TEXT_SIZE1, C_TEXT_SIZE2]

interface AddImageProps {
  onUpload: (filePath: string) => void
}

export function CreateButton() {
  return (
    <Button
      fontSize={createTextSizes}
      color="#f8fae5"
      bg="#9acc9c"
      _hover={{ background: '#8cb88d' }}
      borderRadius="lg"
      width={createButtonWidths}
    >
      Vytvořit nový recept
    </Button>
  )
}

export function SubmitRecipe() {
  return (
    <Button
      bg="#9acc9c"
      _hover={{ background: '#8cb88d' }}
      borderRadius="lg"
      width="200px"
      type="submit"
    >
      Vytvořit recept
    </Button>
  )
}

export const AddImage: React.FC<AddImageProps> = ({ onUpload }) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > ZERO) {
      const file = event.target.files[ZERO]

      const formData = new FormData()
      formData.append('image', file)

      try {
        const response = await fetch('/upload-endpoint', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()
        onUpload(result.imagePath)
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
  }

  return (
    <Box>
      <Input type="file" accept="image/*" onChange={handleFileChange} style={{ border: 'none' }} />
    </Box>
  )
}
export function PrevNextButtons() {
  return (
    <ButtonGroup py="7" display="flex" justifyContent="center" alignItems="center">
      <Button
        width="150px"
        leftIcon={<ArrowLeft />}
        variant="solid"
        bg="#9acc9c"
        color="#f8fae5"
        _hover={{ background: '#8cb88d' }}
      >
        Předchozí
      </Button>
      <Button
        width="150px"
        rightIcon={<ArrowRight />}
        variant="solid"
        bg="#9acc9c"
        color="#f8fae5"
        _hover={{ background: '#8cb88d' }}
      >
        Další
      </Button>
    </ButtonGroup>
  )
}
