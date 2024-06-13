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

  const animatedComponents = makeAnimated() // animated API

  return (
    <Box
      width="375px"
      ml="250px"
      pt="0px"
      sx={{
        '@media screen and (max-width: 1385px)': {
          width: '375px',
          ml: '30px',
          pt: '15px',
        },
        '@media screen and (max-width: 790px)': {
          width: '300px',
          ml: '30px',
          pt: '15px',
        },
      }}
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
