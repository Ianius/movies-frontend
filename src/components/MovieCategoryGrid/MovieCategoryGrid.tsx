import { StarIcon } from '@chakra-ui/icons';
import { AspectRatio, Badge, Box, Center, CircularProgress, Flex, Grid, Heading, Image, Popover, PopoverAnchor, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, SimpleGrid, Skeleton, SkeletonText, Spacer, Text, Stack, Tag, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../api';

interface Movie {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string | undefined;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
    total_results: number;
    total_pages: number;
}

interface MoviePageResponse {
    page: number;
    results: Movie[];
}

interface Props {
    amountOfMoviesToShow?: number;
    title: string;
    query: () => Promise<any>;
}

interface Genres {
    genres: {
        id: number;
        name: string;
    }[];
}

const MovieCover = ({ movie, loading = false }: { movie: Movie, loading?: boolean }) => {
    const { data: genres } = useQuery<Genres>(["genres"], API.getGenres);
    const bg = useColorModeValue('white', 'rgb(32, 43, 67)')

    if (false) {
        return (
            <AspectRatio
                w='100%'
                ratio={500 / 750}
            >
                <Stack>
                    <Skeleton w='100%' h='100%' />
                    <SkeletonText w='100%' h='10%' skeletonHeight={1}/>
                </Stack>
            </AspectRatio>
        );
    }

    return (
        <Box>
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
                                    src={API.getImageURL('w500', movie.poster_path)}
                                    cursor='pointer'
                                    borderRadius={4}
                                    dropShadow='outline'
                                />

                                <Tag
                                    size='md'
                                    position='absolute'
                                    bg='rgb(245, 99, 118)'
                                    right='8px'
                                    bottom='8px'
                                    borderRadius='full'
                                    fontWeight='bold'
                                    color='white'
                                >
                                    {movie.release_date.split('-')[0]}
                                </Tag>
                            </Skeleton>
                        </AspectRatio>
                    </Center>
                </PopoverTrigger>

                <PopoverContent
                    bg={bg}
                    pointerEvents='none'
                    shadow='md'
                >
                    <PopoverHeader fontWeight='semibold'>Summary</PopoverHeader>
                    <PopoverArrow />

                    <PopoverBody>
                        {movie.overview}

                        <Text mt={2} fontWeight='semibold'>Release date</Text>
                        <Text>{movie.release_date}</Text>
                        <Text fontWeight='semibold'>Rating</Text>
                        <Flex
                            alignItems='center'
                            justifyItems='center'
                            gap={1}
                        >
                            <StarIcon color='yellow.400' />
                            <Text>{movie.vote_average}</Text>
                        </Flex>
                    </PopoverBody>

                    <PopoverFooter>
                        {movie.genre_ids.map(id =>
                            <Tag
                                variant='solid'
                                fontWeight='bold'
                                key={id}
                                mr={2}
                                mb={1}
                            >
                                {genres && genres.genres.find(genre => genre.id === id)?.name}
                            </Tag>)}
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

const MovieCategoryGrid = ({ amountOfMoviesToShow = 12, title, query }: Props) => {
    const { data, error } = useQuery<MoviePageResponse, Error>([title], query);

    if (error)
        return <div>Error! {error.message}</div>;

    const emptyMovieData: Movie = {
        poster_path: "",
        adult: false,
        overview: "",
        release_date: "",
        genre_ids: [],
        id: 0,
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

    let movies;

    if (data)
        movies =
            data.results
                .slice(0, amountOfMoviesToShow)
                .map((movie, i) => <MovieCover key={i} movie={movie} />);
    else
        movies =
            Array(amountOfMoviesToShow)
                .fill(0)
                .map((_, i) => <MovieCover key={i} movie={emptyMovieData} loading />)

    return (
        <Center>
            <Box
                p={4}
                w={1200}
            >
                <Center>
                    <Heading as='h2'>{title}</Heading>
                </Center>

                <Spacer height={6} />

                <SimpleGrid
                    columns={[2, 3, 4, 6]}
                    spacing={4}
                >
                    {movies}
                </SimpleGrid>
            </Box>
        </Center>
    );
};

export default MovieCategoryGrid;
