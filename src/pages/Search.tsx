import { Box, Center, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { API } from '../api';
import { MovieSearchResponse } from '../interfaces/movies';

import MovieCategoryGrid from '../components/MovieCategoryGrid';
import MovieCover from '../components/MovieCover';

const Search = () => {
    const [params] = useSearchParams();
    const query = params.get('q') ?? '';

    return (
        <MovieCategoryGrid
            title='Search results'
            query={() => API.search(query)}
        />
    );
};

export default Search;
