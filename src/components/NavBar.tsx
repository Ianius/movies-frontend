import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons';
import {
    Button,
    Center,
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Spacer,
    Stack,
    Switch,
    Text,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Center
            position='sticky'
            top='0px'
            w='100%'
            zIndex={1000}
            bg={useColorModeValue('lightNavbar', 'darkNavbar')}
            minH='60px'
            color={useColorModeValue('black', 'white')}
            shadow={'base'}
        >
            <Flex
                w='100%'
                h='100%'
                py={2}
                px='10%'
                align='center'
            >
                <Heading
                    mx={2}
                    fontWeight='bold'
                    flex={1}
                    textAlign='start'
                >
                    movies
                </Heading>

                <InputGroup
                    mx={2}
                    flex={2}
                >
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon
                            color={useColorModeValue('black', 'blue.50')}
                        />
                    </InputLeftElement>

                    <Input
                        bg={useColorModeValue('white', 'rgb(32, 43, 67)')}
                        type='text'
                        shadow='md'
                        color={useColorModeValue('black', 'white')}
                        placeholder='Search movies'
                        _placeholder={{ color: useColorModeValue('black', 'blue.50'), opacity: 0.8 }}
                        border='none'
                    />
                </InputGroup>

                <Stack
                    mx={2}
                    flex={1}
                    direction='row'
                    justifyContent='end'
                >
                    <IconButton
                        aria-label='Toggle color mode'
                        icon={colorMode == 'dark' ? <SunIcon /> : <MoonIcon />}
                        onClick={toggleColorMode}
                    />
                </Stack>
            </Flex>
        </Center>
    );
};

export default NavBar;
