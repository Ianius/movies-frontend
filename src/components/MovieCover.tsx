import { Icon, StarIcon } from '@chakra-ui/icons';
import { AspectRatio, Box, Center, Flex, Image, Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Skeleton, SkeletonText, Text, Tag, useColorModeValue, Wrap, WrapItem, Portal } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { Movie, MovieDetails } from '../interfaces/movies';
import { FiImage } from 'react-icons/fi'
import GenreTags from './GenreTags';

interface Genres {
    genres: {
        id: number;
        name: string;
    }[];
}

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

export const MovieCover = ({ movie = defaultMovieData, loading = false }: Props) => {
    const navigate = useNavigate();
    const { data: genres } = useQuery<Genres>(["genres", movie.id], API.genres);
    const bg = useColorModeValue('white', 'rgb(32, 43, 67)');
    const coverURL = movie.poster_path ? API.buildImageURL('w500', movie.poster_path) : "";

    const handleClick = () => movie.id > -1 && navigate(`/movie/${movie.id}`);

    return (
        <Box
            onClick={handleClick}
        >
            <Popover
                placement='right'
                trigger='hover'
                openDelay={0}
                closeDelay={0}
            >
                <PopoverTrigger>
                    <Center>
                        <AspectRatio
                            w='100%'
                            ratio={500 / 750}
                        >
                            <Skeleton
                                isLoaded={!loading}
                            >
                                <Image
                                    src={coverURL}
                                    cursor='pointer'
                                    dropShadow='outline'
                                    borderRadius={4}
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
                    </Center>
                </PopoverTrigger>

                <PopoverContent
                    bg={bg}
                    pointerEvents='none'
                    border='none'
                    shadow='md'
                    overflow='hidden'
                >
                    <PopoverHeader fontWeight='semibold'>{movie.title}</PopoverHeader>

                    <PopoverBody>
                        {movie.overview}

                        <Image
                            w='100%'
                            h='100%'
                            top='0px'
                            left='0px'
                            src={coverURL}
                            objectFit='cover'
                            position='absolute'
                            transform='scale(2)'
                            zIndex={-1}
                            filter='auto'
                            blur='20px'
                            bg='black'
                            opacity={0.4}
                        />

                        <Text mt={2} fontWeight='semibold'>Release date</Text>
                        <Text>{movie.release_date ?? "TBD"}</Text>
                        <Text fontWeight='semibold'>Rating</Text>

                        <Flex align="center">
                            <StarIcon color="yellow" mr="1" w="3" h="3" />
                            <Text>{movie.vote_average}</Text>
                        </Flex>
                    </PopoverBody>

                    <PopoverFooter
                        p='8px'
                    >
                        {genres
                            ? <GenreTags
                                genres={movie.genre_ids.map(id => ({
                                    id: id,
                                    name: genres.genres.find(genre => genre.id == id)?.name ?? ""
                                }))}
                            />
                            : undefined}
                    </PopoverFooter>
                </PopoverContent>
            </Popover>

            <Center mt={2}>
                <SkeletonText isLoaded={!loading} w='100%'>
                    <Text fontWeight='bold' align='center'>{movie?.title}</Text>
                </SkeletonText>
            </Center>
        </Box>
    );
};
