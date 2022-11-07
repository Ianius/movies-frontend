import { Box } from "@chakra-ui/react";
import { API } from "../api";
import Hero from "../components/Hero";
import MovieCategoryGrid from "../components/MovieCategoryGrid";

const Home = () => {
    return (
        <Box>
            <Hero />
            <MovieCategoryGrid title='Popular' query={API.popular} />
            <MovieCategoryGrid title='Trending' query={API.trending} />
        </Box>
    );
};

export default Home;
