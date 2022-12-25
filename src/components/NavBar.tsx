import { Icon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { RiMovieFill, RiMovie2Line } from 'react-icons/ri'
import { MdArrowBackIosNew } from 'react-icons/md'
import {
    Link,
    Center,
    Flex,
    Heading,
    IconButton,
    Spacer,
    Stack,
    useColorMode,
    useColorModeValue,
    HStack,
    Box
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ h }: { h: number }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const onHeadingClicked = () => navigate('/');

    return (
        <Center
            w='100%'
            h={`${h}px`}
            bg={useColorModeValue('navbarLight', 'navbarDark')}
            top='0px'
            zIndex='3'
            position='sticky'
        >
            <Flex
                w='100%'
                h='100%'
                py={2}
                maxW='1300px'
                color='white'
                align='center'
            >
                <Link
                    mx={2}
                    flex={1}
                    onClick={onHeadingClicked}
                >
                    <HStack gap={1}>
                        <Center
                            bg='cyan.500'
                            boxSize='36px'
                            borderRadius='full'
                        >
                            <Icon as={RiMovie2Line} boxSize='28px' color='white' />
                        </Center>

                        <Heading
                            size='lg'
                        >
                            movies
                        </Heading>
                    </HStack>
                </Link>

                <Spacer mx={2} flex={2} />

                <Stack
                    mx={2}
                    flex={1}
                    direction='row'
                    justifyContent='end'
                >
                    <IconButton
                        aria-label='Toggle color mode'
                        icon={colorMode == 'dark' ? <SunIcon /> : <MoonIcon />}
                        colorScheme='whiteAlpha'
                        onClick={toggleColorMode}
                    />
                </Stack>
            </Flex>
        </Center>
    );
};

export default NavBar;
