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
      sx={{
        '@media screen and (max-width: 2000px)': {
          width: '600px',
          ml: '100px',
        },
        '@media screen and (max-width: 1272px)': {
          width: '450px',
          ml: '100px',
        },
        '@media screen and (max-width: 1996px)': {
          width: '450px',
          ml: '0px',
        },
        '@media screen and (max-width: 1147px)': {
          width: '300px',
          ml: '0px',
        },
        '@media screen and (max-width: 767px)': {
          width: '375px',
          pt: '10px',
          ml: '30px',
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
