import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import Navbar from './Navbar';
import Home from '../pages/Home';
import Footer from './Footer';
import Search from '../pages/Search';
import Movie from '../pages/Movie';
import Lists from '../pages/Lists';
import ScrollToTop from './ScrollToTop';

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
        <Router>
            <Flex
                minH='100vh'
                align='center'
                direction='column'
            >
                <ScrollToTop/>

                <Helmet>
                    <title>Movies</title>
                    <meta
                        name='description'
                        content='Find all the movies you want!'
                    />
                </Helmet>

                <Navbar/>

                <Flex
                    w='100%'
                    px='2em'
                    flex={1}
                    maxW='1300px'
                    direction='column'
                >
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/search' element={<Search/>} />
                        <Route path='/movie/:id' element={<Movie/>} />
                        <Route path='/lists' element={<Lists/>} />
                    </Routes>
                </Flex>

                <Footer/>
            </Flex>
        </Router>
    );
};

export default App;
