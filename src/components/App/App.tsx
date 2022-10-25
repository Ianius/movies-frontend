import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChakraProvider, Box, Flex, Heading, Center } from '@chakra-ui/react';
import NavBar from '../NavBar/NavBar';

const App = () => {
    return (
        <ChakraProvider>
            <NavBar/>
        </ChakraProvider>
    );
};

export default App;
