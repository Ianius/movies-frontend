import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from '../NavBar/NavBar';
import theme from './theme';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';

const App = () => {
    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'Escape':
                debugger;
                break;
        }
    };

    useEffect(() => {
        document.removeEventListener("keydown", handleKeyDown);
        document.addEventListener("keydown", handleKeyDown);
    });

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
