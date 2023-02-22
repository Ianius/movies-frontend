import { useNavigate } from "react-router-dom";
import { useRef, forwardRef } from "react";
import {
    Flex,
    Text,
    Menu,
    Icon,
    Avatar,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    Heading,
    ButtonGroup,
    Mark,
    HStack,
    Box,
    Button,
    Spacer,
    IconButton,
    useColorModeValue,
    useDisclosure,
    useBoolean,
    useOutsideClick
} from '@chakra-ui/react';
import { useUser, useLogout } from "../hooks/auth";
import { HamburgerIcon } from "@chakra-ui/icons";
import { CgLogOut } from 'react-icons/cg';

import ColorModeSwitch from './ColorModeSwitch';
import SearchBar from './SearchBar';
import AuthModal from "./AuthModal";

interface NavbarMenuProps {
    isOpen?: boolean;
    button: React.ReactNode;
    children: React.ReactNode;
}

const NavbarMenu = forwardRef<HTMLDivElement, NavbarMenuProps>(({ isOpen, children, button }, ref) => {
    return (
        <Menu
            isOpen={isOpen}
            placement='bottom-end'
            closeOnSelect={false}
        >
            <MenuButton
                as={Box}
                pointerEvents='none'
            >
                {button}
            </MenuButton>

            <MenuList
                bg={useColorModeValue('lightAccent', 'darkAccent')}
            >
                <Box
                    ref={ref}
                >
                    {children}
                </Box>
            </MenuList>
        </Menu>
    );
});

const SharedNavbarMenuItems = () => (
    <MenuGroup 
        title='View Options'
    >
        <MenuItem>
            <Flex
                w='100%'
            >
                <Text>Dark Mode</Text>
                <Spacer flex={1}/>
                <ColorModeSwitch/>
            </Flex>
        </MenuItem>
    </MenuGroup>
);

const Navbar = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose} = useDisclosure();

    const [isMenuOpen, setIsMenuOpen] = useBoolean(false);
    const menuRef = useRef(null);

    useOutsideClick({
        ref: menuRef,
        handler: setIsMenuOpen.off
    });

    const user = useUser();
    const logout = useLogout();

    return (
        <>
            <AuthModal isOpen={isOpen} onClose={onClose} />

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
                    <a
                        onClick={() => navigate('/')}
                    >
                        <Heading
                            size='lg'
                            color={useColorModeValue('black', 'white')}
                            cursor='pointer'
                        >
                            <Box>
                                film

                                <Mark bg={useColorModeValue('mainLight', 'mainDark')} color={useColorModeValue('white', 'black')} px='1.5' py='0.5'>
                                    feast
                                </Mark>
                            </Box>
                        </Heading>
                    </a>

                    <SearchBar/>

                    { !user &&
                        <ButtonGroup
                            variant='solid'
                            colorScheme='purple'
                            mx='0.25em'
                        >
                            <Button onClick={onOpen}>Log In</Button>
                        </ButtonGroup>
                    }

                    <NavbarMenu
                        ref={menuRef}
                        isOpen={isMenuOpen}
                        button={
                            <HStack
                                ml='1em'
                                cursor='pointer'
                                spacing='1em'
                                pointerEvents='all'
                                onClick={setIsMenuOpen.on}
                            >
                                { user &&
                                    <HStack
                                    >
                                        <Avatar size='xs' />
                                        <Heading size='sm'>{user.username}</Heading>
                                    </HStack>
                                }

                                <IconButton 
                                    mx='0px'
                                    icon={<HamburgerIcon />} 
                                    variant='ghost'
                                    aria-label='Options' 
                                />
                            </HStack>
                        }
                    >
                        <SharedNavbarMenuItems />

                        { user &&
                            <>
                                <MenuDivider />

                                <MenuGroup
                                    title='Profile'
                                >
                                    <MenuItem
                                        onClick={() => navigate('/lists', { state: { selected: "Favorites" } })}
                                    >
                                        Favorites
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => navigate('/lists', { state: { selected: "Watchlist" } })}
                                    >
                                        Watchlist
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => navigate('/lists')}
                                    >
                                        Lists
                                    </MenuItem>

                                    <MenuItem 
                                        onClick={() => {
                                            setIsMenuOpen.off();
                                            logout();
                                        }}
                                    >
                                        <HStack>
                                            <Icon as={CgLogOut} boxSize='20px' />
                                            <Text>Log Out</Text>
                                        </HStack>
                                    </MenuItem>
                                </MenuGroup>
                            </>
                        }
                    </NavbarMenu>
                </Flex>
            </HStack>
        </>
    );
};

export default Navbar;
