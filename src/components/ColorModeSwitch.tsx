import { HStack, Icon, Switch, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaSun, FaMoon } from 'react-icons/fa'

const ColorModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <HStack
            py='12px'
            px='20px'
        >
            <Icon as={FaSun} fontSize='xl' /> 
            <Switch isChecked={colorMode === 'dark'} colorScheme='black' onChange={toggleColorMode} />
            <Icon as={FaMoon} fontSize='xl' /> 
        </HStack>
    );
};

export default ColorModeSwitch;
