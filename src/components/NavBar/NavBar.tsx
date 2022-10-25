import { SearchIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Heading, Input, InputGroup, InputLeftElement, Spacer, Text } from '@chakra-ui/react';

const NavBar = () => {
    return (
        <Center
            bg='white'
            minH='60px'
            color='blue.900'
            borderBottom={"2px solid"}
            borderColor='gray.100'
        >
            <Flex
                flex={1}
                alignItems='center'
                justifyItems='center'
                paddingLeft='10%'
                paddingRight='10%'
                py={2}
            >
                <Heading m={2} flex={1}>Movies</Heading>

                <InputGroup
                    flex={2}
                >
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon 
                            color='gray.700'

                            />
                    </InputLeftElement>

                    <Input 
                        bg='whiteAlpha.900'
                        shadow='base'
                        type='text' 
                        color='black'
                        placeholder='Search movies' 
                        _placeholder={{ color: 'black', opacity: 0.8 }}
                        />
                </InputGroup>

                <Spacer flex={1}/>
            </Flex>
        </Center>
    );
};

export default NavBar;
