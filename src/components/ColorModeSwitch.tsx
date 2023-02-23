import { HStack, Icon, Switch, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from 'react-icons/fa'

const ColorModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <HStack
        >
            <Icon as={FaSun} fontSize='xl' /> 
            <Switch isChecked={colorMode === 'dark'} colorScheme='blue' onChange={toggleColorMode} />
            <Icon as={FaMoon} fontSize='xl' /> 
        </HStack>
    );
};

export default ColorModeSwitch;
