import { SearchIcon } from "@chakra-ui/icons";
import { AspectRatio, Box, Button, Center, Heading, Input, InputGroup, InputLeftElement, InputRightElement, useColorMode, useColorModeValue, VStack } from "@chakra-ui/react";

import moviesImage from '../assets/movies.png';

const Hero = () => {
    const { colorMode } = useColorMode();
    const gradient = colorMode === 'light' ? 'lightBackground' : 'darkBackground';

    return (
        <Box
            h='450px'
            w='100%'
            position='relative'
            overflow='hidden'
        >
            <Box
                w="100%"
                h="100%"
                backgroundImage={moviesImage}
                backgroundPosition='center'
                backgroundSize='cover'
            >
                <Box
                    w="100%"
                    h="100%"
                    bgGradient={`linear(to-b, rgba(0,0,0,0.4), ${gradient})`}
                    />
            </Box>

            <Center
                position='absolute'
                top="0px"
                left="0px"
                w='100%'
                h='100%'
            >
                <VStack
                    align='center'
                    spacing={8}
                    w='90%'
                    maxW='1000px'
                    p='20px'
                >
                    <Heading
                        fontSize='xx-large'
                    >
                        Find your favorite movies.
                    </Heading>

                    <InputGroup
                        mx={2}
                        size='lg'
                    >
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon
                                color='gray.400'
                                />
                        </InputLeftElement>

                        <InputRightElement
                            right='-1px'
                            w='100px'
                            h='100%'
                            bg='transparent'
                        >
                            <Button
                                w='100%'
                                h='100%'
                                bg='accent'
                                borderRadius='full'
                            >
                                Search
                            </Button>
                        </InputRightElement>

                        <Input
                            bg='white'
                            type='text'
                            shadow='md'
                            color='gray.600'
                            placeholder='Search movies'
                            _placeholder={{ color: 'gray.400', opacity: 0.8 }}
                            border='none'
                            borderRadius='full'
                            _focus={{border:'none'}}
                            focusBorderColor='transparent'
                            _selected={{border: 'none'}}
                            />
                    </InputGroup>
                </VStack>
            </Center>
        </Box>
    );
};

export default Hero;
