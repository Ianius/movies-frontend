import { Text, Heading, Flex, Box, Spinner, VStack, HStack, useColorModeValue, Divider } from '@chakra-ui/react';
import { useParamsMovieCredits, useParamsMovie, usePosterImage, useParamsMovieSimilar } from '../hooks/movie';

import GenreTags from '../components/GenreTags';
import MovieCategoryGrid from '../components/MovieCategoryGrid';
import MemberList from '../components/MemberList';
import CoverImage from '../components/CoverImage';
import ReviewSection from '../components/ReviewSection';
import MovieListButtons from '../components/ItemListButtons';

const Movie = () => {
    const { data: movie, isLoading: movieLoading } = useParamsMovie();
    const { data: credits }                        = useParamsMovieCredits();
    const { url, isLoading: posterLoading }        = usePosterImage('w342', movie);
    const { data: similar }                        = useParamsMovieSimilar();

    const headingColor = useColorModeValue('gray.600', 'gray.500');
    const year = movie?.release_date?.split('-')[0] ?? 'N/A';

    return (
        <VStack
            mb='2em'
            gap='2em'
            flex={1}
            align='left'
        >
            <Flex
                w='100%'
                h='100%'
                gap='1em'
                direction={["column", "row"]}
            >
                <CoverImage
                    w='100%'
                    flex={2}
                    src={url}
                    ratio={500 / 750}
                    isLoading={posterLoading}
                />

                <Box
                    flex={6}
                    overflow='hidden'
                >
                    { movieLoading &&
                        <Flex
                            h='200px'
                            align='center'
                            justify='center'
                        >
                            <Spinner size='xl' />
                        </Flex>
                    }

                    { movie &&
                        <Flex
                            w='100%'
                            h='100%'
                            gap='1em'
                            direction='column'
                        >
                            <VStack
                                align='start'
                            >
                                <HStack>
                                    <Heading size='lg'>{`${movie.title} `}</Heading>
                                    <Heading size='lg' color={headingColor}>({year})</Heading>
                                </HStack>

                                <Text>{movie.tagline}</Text>

                                { movie && <GenreTags genres={movie.genres} /> }
                            </VStack>

                            <Divider />

                            <MovieListButtons movieId={movie.id}/>

                            <Heading size='sm' color={headingColor}>Overview</Heading>
                            <Text pb='0.5em'>{movie.overview}</Text>
                        </Flex>
                    }
                </Box>
            </Flex>

            { credits && 
                <Box
                    flex={1}
                >
                    <MemberList data={credits.crew}/>
                    <MemberList data={credits.cast}/>
                </Box>
            }

            { movie &&
                <ReviewSection movieId={movie.id} />
            }

            <MovieCategoryGrid title='Similar movies' movies={similar} />
        </VStack>
    );
};

export default Movie;
