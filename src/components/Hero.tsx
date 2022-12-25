import { SearchIcon } from "@chakra-ui/icons";
import { Link, Box, Button, Center, Heading, Input, InputGroup, InputLeftElement, InputRightElement, useColorMode, VStack } from "@chakra-ui/react";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

import moviesImage from '../assets/movies.jpg';

const Hero = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    const handleSearchTextChanged = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);
    const handleSearchSubmitted = () => searchText.length > 0 && navigate(`/search?q=${searchText}`);
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => e.key == "Enter" && handleSearchSubmitted();

    return (
        <Center>
            <Box
                h='360px'
                w='100%'
                maxW='1300px'
                position='relative'
                overflow='hidden'
            >
                <Box
                    w="100%"
                    h="100%"
                    backgroundImage={moviesImage}
                    backgroundPosition='center'
                    backgroundSize='contain'
                >
                    <Box
                        w="100%"
                        h="100%"
                        // bgGradient={`linear(to-b, rgba(0,0,0,0.4), ${gradient})`}
                        // bgGradient={'radial-gradient(circle, rgba(35,52,139,0.7) 0%, rgba(142,40,61,0.7) 100%)'}
                        // bgGradient={'linear-gradient(rgba(0, 15, 200, 0.5),rgba(0, 15, 200, 0.5))'}
                        // bgGradient={'linear-gradient(to right, rgba(3, 37, 75, 0.7) 0%, rgba(3, 37, 75, 0.5) 100%)'}
                        bgGradient={'linear-gradient(to top,rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.7) 60%,rgba(0, 0, 0, 0.6) 100%)'}
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
                        p='20px'
                    >
                        <Heading
                            color='white'
                            fontSize='4xl'
                            textShadow='2xl'
                        >
                            Find your favorite movies.
                        </Heading>

                        <InputGroup
                            mx={2}
                            size='lg'
                        >
                            <InputLeftElement pointerEvents='none'>
                                <SearchIcon
                                    color='gray.300'
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
                                    bg='cyan.600'
                                    color='white'
                                    borderRadius='full'
                                    onClick={handleSearchSubmitted}
                                    _hover={{ bg: 'cyan.400' }}
                                >
                                    Search
                                </Button>
                            </InputRightElement>

                            <Input
                                bg='white'
                                type='text'
                                shadow='md'
                                color='gray.600'
                                placeholder='Search movies...'
                                border='none'
                                borderRadius='full'
                                focusBorderColor='transparent'
                                value={searchText}
                                onChange={handleSearchTextChanged}
                                onKeyDown={handleKeyDown}
                                _focus={{ border: 'none' }}
                                _selected={{ border: 'none' }}
                                _placeholder={{ color: 'gray.400', opacity: 0.8 }}
                            />
                        </InputGroup>
                    </VStack>
                </Center>
            </Box>
        </Center>
    );
};

export default Hero;
