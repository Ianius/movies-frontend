import { StarIcon } from '@chakra-ui/icons';
import { HStack, Box, Flex, Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text, useColorModeValue } from '@chakra-ui/react';
import { Movie } from '../interfaces/movies';

import GenreTags from './GenreTags';
import { useGenres } from '../hooks/movie';

interface Props {
    movie: Movie;
    isOpen: boolean;
    children: React.ReactNode;
}

const MoviePopover = ({ movie, isOpen, children }: Props) => {
    const { data: { genres } } = useGenres();

    return (
        <Popover
            id='movie-popover'
            isOpen={isOpen}
            trigger='hover'
            autoFocus={false}
            placement='right'
            openDelay={0}
            closeDelay={0}
        >
            <PopoverTrigger>
                {children}
            </PopoverTrigger>

            <PopoverContent
                bg={useColorModeValue('lightAccent', 'darkAccent')}
                pointerEvents='none'
                border='none'
                shadow='md'
                overflow='hidden'
            >
                <PopoverHeader>
                    <Box
                        fontWeight='bold'
                    >
                        <HStack
                            align='end'
                        >
                            <Box>
                                {movie.title} 
                            </Box>

                            <Box
                                color={useColorModeValue('mainLight', 'mainDark')}
                            >
                                {(movie.release_date && movie.release_date.split("-")[0]) || "TBD"}
                            </Box>
                        </HStack>

                        <Flex align="center">
                            <Text>{movie.vote_average} / 10</Text>
                            <StarIcon ml="1" w="3" h="3" />
                        </Flex>
                    </Box>
                </PopoverHeader>

                <PopoverBody>
                    {movie.overview}
                </PopoverBody>

                <PopoverFooter
                    p='8px'
                >
                    {<GenreTags
                        genres={movie.genre_ids.map(id => ({
                            id: id,
                            name: genres.find(genre => genre.id === id)?.name ?? ""
                        }))}
                    />}
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default MoviePopover;
