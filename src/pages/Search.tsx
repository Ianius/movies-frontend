import { Box, Center, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { API } from '../api';
import MovieCategoryGrid from '../components/MovieCategoryGrid';
import { MovieCover } from '../components/MovieCover';
import { MovieSearchResponse } from '../interfaces/movies';

const Search = () => {
    const [params] = useSearchParams();
    const query = params.get('q') ?? '';
    // const { data, error } = useQuery<MovieSearchResponse, Error>(['search'], () => API.search(query));

    // console.log('Search data obtained:');
    // console.log(data);

    // const movies = data
    //     && data.results.map(movie => <MovieCover movie={movie} />)

    // return (
    //     <SimpleGrid
    //         columns={[2, 3, 4, 6]}
    //         spacing={4}
    //     >
    //         {movies}
    //     </SimpleGrid>
    // );

    return (
        <Center>
            <Box
                maxW='1300px'
            >
                <MovieCategoryGrid
                    title='Search results'
                    query={() => API.search(query)}
                    />
            </Box>
        </Center>
    );
};

export default Search;
