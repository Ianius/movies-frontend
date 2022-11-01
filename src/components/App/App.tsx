import './App.css';
import { Box, ChakraProvider, Image, Link, Stack, useColorModeValue } from '@chakra-ui/react';
import NavBar from '../NavBar/NavBar';
import theme from './theme';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Footer from '../Footer/Footer';

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Helmet>
                    <title>Movies</title>
                    <meta
                        name='description'
                        content='Find movies, save lists and review them!'
                        />
                </Helmet>

                <NavBar />

                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>

                <Footer />
            </Router>
        </ChakraProvider>
    );
};

export default App;
