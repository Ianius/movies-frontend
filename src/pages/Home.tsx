import { Box } from "@chakra-ui/react";
import MovieCategoryGrid from "../components/MovieCategoryGrid";
import { usePopular, useTrending } from "../hooks/movie";

const Home = () => {
    const { data: popular } = usePopular();
    const { data: trending } = useTrending();

    return (
        <Box
            w='100%'
        >
            <MovieCategoryGrid title='Popular' movies={popular}/>
            <MovieCategoryGrid title='Popular' movies={trending}/>
        </Box>
    );
};

export default Home;
