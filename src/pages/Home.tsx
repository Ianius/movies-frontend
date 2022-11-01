import { Box } from "@chakra-ui/react";
import { API } from "../api";
import MovieCategoryGrid from "../components/MovieCategoryGrid/MovieCategoryGrid";

const Home = () => {
    return (
        <Box>
            <MovieCategoryGrid title='Popular' query={API.fetchPopularMovies} />
            <MovieCategoryGrid title='Trending' query={API.fetchTrendingMovies} />
        </Box>
    );
};

export default Home;
