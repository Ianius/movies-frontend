import NavBar from './NavBar';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Footer from './Footer';
import { useEffect } from 'react';
import Search from '../pages/Search';
import Movie from '../pages/Movie';
import { Box } from '@chakra-ui/react';
import ScrollToTop from './ScrollToTop';

const App = () => {
    const NAVBAR_HEIGHT = 64;
    const FOOTER_HEIGHT = 60;

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
        <Box
            color='white'
        >
            <Router>
                <ScrollToTop />
                <Helmet>
                    <title>Movies</title>
                    <meta
                        name='description'
                        content='Find all the movies you want!'
                    />
                </Helmet>

                <NavBar h={NAVBAR_HEIGHT} />

                <Box
                    minH={`calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT - 1}px)`}
                >
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/search' element={<Search />} />
                        <Route path='/movie/:id' element={<Movie />} />
                    </Routes>
                </Box>

                <Footer h={FOOTER_HEIGHT} />
            </Router>
        </Box>
    );
};

export default App;
