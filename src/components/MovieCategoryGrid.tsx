import { VStack, Heading, SimpleGrid } from '@chakra-ui/react';
import { MoviePageResponse } from '../interfaces/movies';

import CoverImagePopover from './CoverImagePopover';

interface Props {
    title: string;
    amount?: number;
    movies?: MoviePageResponse;
}

const MovieCategoryGrid = ({ title, amount = 12, movies }: Props) => {
    const elements =
        movies
            ? movies.results
                .slice(0, amount)
                .map((movie, i) => <CoverImagePopover key={i} movie={movie} />)
            : Array(amount)
                .fill(0)
                .map((_, i) => <CoverImagePopover key={i} />);

    return (
        <VStack
            w='100%'
            pb='2em'
            spacing='1.5em'
            align='left'
        >
            <Heading size='lg'>{title}</Heading>

            <SimpleGrid
                boxSize='100%'
                columns={[2, 3, 4, 6]}
                spacing={4}
            >
                {elements}
            </SimpleGrid>
        </VStack>
    );
};

export default MovieCategoryGrid;
