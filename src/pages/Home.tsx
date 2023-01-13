import { Box, Center } from "@chakra-ui/react";
import { API } from "../api";
import Hero from "../components/Hero";
import MovieCategoryGrid from "../components/MovieCategoryGrid";

const Home = () => {
    return (
        <Box
            w='100%'
        >
            <MovieCategoryGrid title='Popular' query={API.popular}/>
            <MovieCategoryGrid title='Trending' query={API.trending}/>
        </Box>
    );
};

export default Home;
