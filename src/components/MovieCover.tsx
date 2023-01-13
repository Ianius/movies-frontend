import { Icon, StarIcon } from '@chakra-ui/icons';
import { HStack, AspectRatio, Box, Center, Flex, Image, Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Skeleton, SkeletonText, Text, Tag, Wrap, WrapItem, Portal, forwardRef } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { Movie, MovieDetails } from '../interfaces/movies';
import { FiImage } from 'react-icons/fi'

import GenreTags from './GenreTags';
import MoviePopover from './MoviePopover';

const defaultMovieData: Movie = {
    poster_path: undefined,
    adult: false,
    overview: "",
    release_date: "",
    genre_ids: [],
    id: -1,
    original_title: "",
    original_language: "",
    title: "",
    backdrop_path: "",
    popularity: 0,
    vote_count: 0,
    video: false,
    vote_average: 0,
    total_results: 0,
    total_pages: 0,
};

interface Props {
    movie?: Movie;
    loading?: boolean;
}

const MovieCover = forwardRef<Props, 'div'>(({ movie = defaultMovieData, loading = false }, ref) => {
    const navigate = useNavigate();
    const coverURL = movie.poster_path ? API.buildImageURL('w500', movie.poster_path) : "";

    const handleClick = () => movie.id > -1 && navigate(`/movie/${movie.id}`);

    return (
        <Box
            ref={ref}
            onClick={handleClick}
        >
            <MoviePopover
                movie={movie}
            >
                <AspectRatio
                    ratio={500 / 750}
                >
                    <Skeleton
                        isLoaded={!loading}
                        borderRadius='md'
                    >
                        <Image
                            src={coverURL}
                            cursor='pointer'
                            dropShadow='outline'
                            borderRadius='md'
                            fallback={
                                <Center
                                    bg='gray.400'
                                    w='100%'
                                    h='100%'
                                    borderRadius={4}
                                    cursor='pointer'
                                >
                                    <Icon as={FiImage} boxSize='100px' color='gray.500' />
                                </Center>
                            }
                        />
                    </Skeleton>
                </AspectRatio>
            </MoviePopover>
        </Box>
    );
});

export default MovieCover;
