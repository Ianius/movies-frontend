import { Icon, StarIcon } from '@chakra-ui/icons';
import { HStack, AspectRatio, Box, Center, Flex, Image, Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Skeleton, SkeletonText, Text, Tag, useColorModeValue, Wrap, WrapItem, Portal } from '@chakra-ui/react';
import { Movie, MovieDetails, MovieGenresResponse } from '../interfaces/movies';
import { useQuery } from '@tanstack/react-query';
import { API } from '../api';
import GenreTags from './GenreTags';

interface Props {
    movie: Movie;
    children: React.ReactNode;
}

const MoviePopover = ({ movie, children }: Props) => {
    const { data: { genres } = { genres: [] } } = useQuery<MovieGenresResponse>(["genres", movie.id], API.genres);

    return (
        <Popover
            placement='right'
            trigger='hover'
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
                            name: genres.find(genre => genre.id == id)?.name ?? ""
                        }))}
                    />}
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default MoviePopover;
