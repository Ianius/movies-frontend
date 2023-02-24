import { Icon } from '@chakra-ui/icons';
import { AspectRatio, Center, Image, Skeleton, useBoolean } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Movie } from '../interfaces/movies';
import { FiImage } from 'react-icons/fi';

import MoviePopover from './MoviePopover';
import { usePosterImage } from '../hooks/movie';

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
}

const CoverImagePopover = ({ movie = defaultMovieData }: Props) => {
    const [isPopoverOpen, setIsPopoverOpen] = useBoolean(false);
    const { url, isLoading: posterLoading } = usePosterImage('w185', movie);

    return (
        <MoviePopover
            movie={movie}
            isOpen={isPopoverOpen}
        >
            <AspectRatio
                ratio={500 / 750}
            >
                <Skeleton
                    isLoaded={!posterLoading}
                    borderRadius='sm'
                >
                    <Link
                        to={`/movie/${movie.id}`}
                        onClick={setIsPopoverOpen.off}
                    >
                        <Image
                            src={url}
                            cursor='pointer'
                            onPointerEnter={setIsPopoverOpen.on}
                            onPointerLeave={setIsPopoverOpen.off}
                            dropShadow='outline'
                            borderRadius='sm'
                            fallback={
                                <Center
                                    bg='gray.700'
                                    w='100%'
                                    h='100%'
                                    borderRadius={4}
                                    cursor='pointer'
                                >
                                    <Icon as={FiImage} boxSize='100px' color='gray.600' />
                                </Center>
                            }
                        />
                    </Link>
                </Skeleton>
            </AspectRatio>
        </MoviePopover>
    );
};

export default CoverImagePopover;
