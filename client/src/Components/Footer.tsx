import { Box, Divider, Text } from '@chakra-ui/react'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <Box bg="#BFF6C3">
      <Divider />
      <Box>
        <Text pt="10px" pl="15px">
          © {year} Niky
        </Text>
      </Box>
    </Box>
  )
}
