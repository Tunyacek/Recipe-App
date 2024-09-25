import { Box, ButtonGroup, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { Header } from '../Components/Shared/Header/Header'
import { Footer } from '../Components/Shared/Footer/Footer'
import potImage from '../assets/onder-ortel-rpMvlIvT9hM-unsplash.jpg'
import { CornerRightDown } from 'lucide-react'
import { LoginRedirect, RegisterRedirect } from '../Components/Shared/Buttons/Button'

export function Titlepage() {
  return (
    <Box bg="#d0ffd5">
      <Box ml="5px">
        <Header />
      </Box>

      <Box minHeight="83.2vh" bg="#f3fff4">
        <Box position="relative" w="100%" h="83.2vh">
          <Image src={potImage} h="100%" w="100%" objectFit="cover" />
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            zIndex="1"
            color="black"
            textAlign="left"
            pl="100px"
          >
            <Heading fontSize="70px" ml="40px" mb="70px">
              Nom Nom Nation
            </Heading>
            <Text fontSize="19px" ml="40px" mb="30px">
              Vaše osobní kuchařka na dosah ruky.
            </Text>
            <Text fontSize="19px" ml="40px" mb="30px">
              Ukládejte, sdílejte a objevujte chutné recepty na jednom místě!
            </Text>

            <Flex direction="row" my="30px" ml="35px">
              <Text>Nemáte účet? Zaregistrujte se zde</Text>
              <Box>
                <CornerRightDown />
              </Box>
            </Flex>
            <ButtonGroup ml="125px">
              <LoginRedirect isDarker={true} />
              <RegisterRedirect isDarker={true} />
            </ButtonGroup>
          </Flex>
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}
