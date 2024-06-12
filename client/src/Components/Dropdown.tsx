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
    <Box
      width={['375px', '375px', '350px']}
      ml={['30px', '30px', '250px']}
      pt={['15px', '15px', '0px']}
    >
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
            primary25: '#9acc9c',
            primary: '#9acc9c',
          },
        })}
      />
    </Box>
  )
}
