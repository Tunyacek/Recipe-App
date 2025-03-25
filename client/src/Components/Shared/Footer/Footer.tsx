import { Box, Divider, Text } from '@chakra-ui/react'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <Box bg="#d0ffd5" pb="15px" sx={{ pb: '28px' }}>
      <Divider />
      <Box>
        <Text mt="20px" ml="10px">
          © {year} Niky 🦕
        </Text>
      </Box>
    </Box>
  )
}
