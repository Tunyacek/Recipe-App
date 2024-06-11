import { Box } from '@chakra-ui/react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

export function Dropdown() {
  const options = [
    { label: 'Category1', value: '1' },
    { label: 'Category2', value: '2' },
    { label: 'Category3', value: '3' },
    { label: 'Category4', value: '4' },
  ]

  const animatedComponents = makeAnimated() //animated API

  return (
    <Box width="300px">
      <Select
        placeholder="Kategorie"
        options={options}
        isMulti
        closeMenuOnSelect={false}
        components={animatedComponents}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: '#FFC7C7',
            primary: '#FFC7C7',
          },
        })}
      />
    </Box>
  )
}
