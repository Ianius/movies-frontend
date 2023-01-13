import { Icon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { RiMovie2Fill } from 'react-icons/ri'
import { HiFilm } from 'react-icons/hi'
import { RiMovieFill } from 'react-icons/ri'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Center,
    Flex,
    Heading,
    IconButton,
    ButtonGroup,
    Spacer,
    Stack,
    Mark,
    HStack,
    Box,
    Highlight,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    Input,
    useColorMode,
    useColorModeValue,
    useHighlight,
    useDisclosure,
} from '@chakra-ui/react';

import ColorModeSwitch from './ColorModeSwitch';
import SearchBar from './SearchBar';
import LoginModal from './LoginModal';

const NavBar = () => {
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const goHome = () => navigate('/');

    return (
        <>
            { /* Modals */ } 
            <LoginModal isOpen={isOpen} onClose={onClose}/>

            <HStack
                w='100%'
                bg={useColorModeValue('navbarLight', 'navbarDark')}
                px='1em'
                mb='1em'
                top='0px'
                zIndex='3'
                justify='center'
                position='sticky'
            >
                <Flex
                    py='16px'
                    maxW='1300px'
                    align='center'
                    boxSize='100%'
                >
                    <Heading
                        size='lg'
                        color={useColorModeValue('black', 'white')}
                        cursor='pointer'
                        onClick={goHome}
                    >
                        <Box>
                            film

                            <Mark bg={useColorModeValue('mainLight', 'mainDark')} color={useColorModeValue('white', 'black')} px='1.5' py='0.5'>
                                feast
                            </Mark>
                        </Box>
                    </Heading>

                    <SearchBar/>

                    <ButtonGroup
                        variant='ghost'
                        colorScheme='gray'
                        mx='0.25em'
                    >
                        <Button onClick={onOpen}>Log In</Button>
                        <Button onClick={() => {}}>Sign Up</Button>
                    </ButtonGroup>

                    <ColorModeSwitch/>
                </Flex>
            </HStack>
        </>
    );
};

export default NavBar;
