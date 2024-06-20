import { Box, Flex } from '@chakra-ui/react'
import { SubmitForm } from '../Components/Createpage/SubmitForm'
import { HeaderLogo } from '../Components/Header/Header'
import { Footer } from '../Components/Footer/Footer'

export function Createpage() {
  return (
    <Flex direction="column" minHeight="100vh" bg="#f3fff4">
      <Box bg="#BFF6C3">
        <Box ml="5px">
          <HeaderLogo />
        </Box>
      </Box>
      <Box flex="1">
        <SubmitForm />
      </Box>
      <Footer />
    </Flex>
  )
}
