import { Image, Box, Center, AspectRatio, Skeleton, GridItem, Grid, Heading, Text, Highlight, CircularProgress, CircularProgressLabel, SkeletonText, VStack, HStack, Icon, Button, Stack, Flex, IconButton, Spacer, Tag, Divider, SimpleGrid, Wrap } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FiImage } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { API } from '../api';
import GenreTags from '../components/GenreTags';
import MovieCategoryGrid from '../components/MovieCategoryGrid';
import { MovieCredits, MovieDetails } from '../interfaces/movies';
import { useState } from 'react';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'

type Params = Record<string, "id">;

const Movie = () => {
    const { id = '' } = useParams<Params>();
    const detailsQuery = useQuery<MovieDetails, Error>(["details", id], () => API.movie(id));
    const creditsQuery = useQuery<MovieCredits, Error>(["credits", id], () => API.credits(id));
    const year = detailsQuery.data?.release_date?.split('-')[0] ?? 'N/A';
    const rating = Math.round((detailsQuery.data?.vote_average ?? 0) / 10 * 100);
    const ratingColor =
        rating < 30
            ? 'pink.500'
            : rating < 60
                ? 'blue.500'
                : 'cyan.500';
    
    return (
        <Center p='20px'>
            <Box
                w='100%'
                maxW='1300px'
            >
                <Grid
                    p='4px'
                    gap='8px'
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                >
                    <GridItem
                        rowSpan={1}
                        colSpan={2}
                    >
                        <AspectRatio
                            w='100%'
                            ratio={500 / 750}
                        >
                            <Skeleton
                                isLoaded={!detailsQuery.isLoading}
                            >
                                <Box
                                    position='relative'
                                >
                                    <Image
                                        src={detailsQuery.data?.poster_path ? API.buildImageURL('w500', detailsQuery.data.poster_path) : ""}
                                        // fit='cover'
                                        cursor='pointer'
                                        borderRadius='4px'
                                        dropShadow='outline'
                                        />

                                    <Center
                                        bg='blue.900'
                                        maxW='72px'
                                        maxH='72px'
                                        borderRadius='full'
                                        position='absolute'
                                        left='8px'
                                        bottom='8px'
                                    >
                                        <Box
                                            bg='black'
                                            opacity='0.6'
                                            minW='100%'
                                            minH='100%'
                                            position='absolute'
                                            borderRadius='full'
                                        />

                                        <CircularProgress
                                            py='8px'
                                            value={rating}
                                            size='70px'
                                            color={ratingColor}//'blue.400'
                                            thickness='6px'
                                            trackColor='blue.900'
                                        >
                                            <CircularProgressLabel fontWeight='bold'>
                                                {rating}%
                                            </CircularProgressLabel>
                                        </CircularProgress>
                                    </Center>
                                </Box>
                            </Skeleton>
                        </AspectRatio>
                    </GridItem>

                    <GridItem
                        rowSpan={1}
                        colSpan={4}
                    >
                        <Flex 
                            minH='100%' 
                            gap={2} 
                            direction='column' 
                            px='10px'
                        >
                            { /* <Skeleton isLoaded={!detailsQuery.isLoading}> */ }
                                <Heading size='xl'>
                                    <Highlight
                                        query={"(" + year + ")"}
                                        styles={{ rounded: 'full', color: 'blue.400' }}
                                    >
                                        {detailsQuery.data?.title + " " + "(" + year + ")"}
                                    </Highlight>
                                </Heading>
                            { /* </Skeleton> */ }

                            { /* <SkeletonText isLoaded={!detailsQuery.isLoading} noOfLines={1}> */ }
                                <Text>{detailsQuery.data?.tagline}</Text>
                            { /* </SkeletonText> */ }

                            { /* <Skeleton isLoaded={!detailsQuery.isLoading}> */ }
                                {detailsQuery.data ? <GenreTags genres={detailsQuery.data.genres}/> : undefined}
                            { /* </Skeleton> */ }

                            { /* <Skeleton isLoaded={!detailsQuery.isLoading}> */ }
                                <Heading size='md'>Overview</Heading>
                            { /* </Skeleton> */ }

                            { /* <SkeletonText isLoaded={!detailsQuery.isLoading} noOfLines={3}> */ }
                                <Text>{detailsQuery.data?.overview}</Text>
                            { /* </SkeletonText> */ }

                            { /* <Skeleton isLoaded={!creditsQuery.isLoading}> */ }
                            { /* </Skeleton> */ }

                            <Flex
                                flex={1}
                                justify='end'
                                direction='column'
                            >
                                <SimpleGrid
                                    w='100%'
                                    flex={1}
                                    columns={3}
                                    spacingX='20%'
                                    alignItems='center'
                                >
                                    {creditsQuery.data?.crew.slice(0, 6).map(member => (
                                        <Box>
                                            <b>
                                                {member.name}
                                            </b>

                                            <br/>

                                            <Box color='gray.400'>
                                                {member.job}
                                            </Box>
                                        </Box>
                                    ))}
                                </SimpleGrid>

                                <VStack
                                    align='center'
                                    justify='end'
                                >
                                    <Heading size='md'>Cast</Heading>
                                    <HCastList maxShown={5} data={creditsQuery.data}/>
                                </VStack>
                            </Flex>
                        </Flex>
                    </GridItem>
                </Grid>

                <MovieCategoryGrid id={id} title='Similar movies' query={() => API.similarMovies(id)}/>
            </Box>
        </Center>
    );
};

const HCastList = ({ data, maxShown }: { data?: MovieCredits, maxShown: number }) => {
    const [index, setIndex] = useState(0);
    const cast = data?.cast ?? [];

    const members = [];

    const start = maxShown * index;
    const shownSoFar = index * maxShown;
    const toShow = start + Math.min(cast.length, cast.length - shownSoFar, maxShown);

    for (let i = start; i < toShow; i++) {
        const member = cast[i];

        members.push(
            <VStack
                w='140px'
                h='180px'
                key={i}
            >
                <Image
                    mr='2px'
                    w='138px'
                    h='138px'
                    key={member.id}
                    src={member?.profile_path ? API.buildImageURL('w500', member.profile_path) : ""}
                    objectFit='cover'
                    borderRadius='full'
                    fallback={(
                        <Center
                            bg='gray.400'
                            minW='138px'
                            minH='138px'
                            borderRadius='full'
                        >
                            <Icon as={FiImage} boxSize='60px' color='gray.500' />
                        </Center>
                    )}
                    />

                <Center
                    px='8px'
                    pb='8px'
                    w='100%'
                    h='100%'
                    color='gray.400'
                >
                    <Text fontWeight='bold' noOfLines={1}>
                        {member.name}
                    </Text>
                </Center>
            </VStack>
        );
    }

    return (
        <VStack
            align='center'
            justify='end'
        >
            <HStack>
                <Box
                    as={MdOutlineArrowBackIos}
                    boxSize='40px'
                    cursor='pointer'
                    opacity={0.5}
                    onClick={() => setIndex(Math.max(index - 1, 0))}
                    transition='opacity 0.1s'
                    _hover={{ opacity: 1 }}
                    />

                {members}

                <Box
                    as={MdOutlineArrowForwardIos}
                    boxSize='40px'
                    cursor='pointer'
                    opacity={0.5}
                    onClick={() => setIndex(Math.min(index + 1, Math.ceil(cast.length / maxShown) - 1))}
                    transition='opacity 0.1s'
                    _hover={{ opacity: 1 }}
                    />
            </HStack>
        </VStack>
    );
};

export default Movie;
