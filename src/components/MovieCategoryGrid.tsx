import { VStack, Box, Center, Heading, SimpleGrid, Spacer } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { MoviePageResponse } from '../interfaces/movies';

import MovieCover from './MovieCover';

interface Props {
    id?: string;
    amount?: number;
    title: string;
    query: () => Promise<MoviePageResponse>;
}

const MovieCategoryGrid = ({ id, amount = 12, title, query }: Props) => {
    const { data, error } = useQuery<MoviePageResponse, Error>([title, id], query);

    if (error) return <Center>Error! {error.message}</Center>;

    const movies =
        data
            ? data.results
                .slice(0, amount)
                .map((movie, i) => <MovieCover key={i} movie={movie} />)
            : Array(amount)
                .fill(0)
                .map((_, i) => <MovieCover key={i} loading />);

    return (
        <VStack
            w='100%'
            pb='2em'
            spacing='1.5em'
        >
            <Heading w='100%' size='lg' textAlign='left'>{title}</Heading>

            <SimpleGrid
                boxSize='100%'
                columns={[2, 3, 4, 6]}
                spacing={4}
            >
                {movies}
            </SimpleGrid>
        </VStack>
    );
};

export default MovieCategoryGrid;
