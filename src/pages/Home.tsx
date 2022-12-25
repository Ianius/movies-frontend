import { Box, Center } from "@chakra-ui/react";
import { API } from "../api";
import Hero from "../components/Hero";
import MovieCategoryGrid from "../components/MovieCategoryGrid";

const Home = () => {
    return (
        <Center>
            <Box
                w='100%'
                maxW='1300px'
            >
                <Hero />
                <MovieCategoryGrid title='Popular' query={API.popular} />
                <MovieCategoryGrid title='Trending' query={API.trending} />
            </Box>
        </Center>
    );
};

export default Home;
