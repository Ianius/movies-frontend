import { Center, Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

import AspectRatioConstraint from './AspectRatioConstraint';

interface Props {
    rating: number;
}

const CircularRating = ({ rating }: Props) => {
    const ratingColor =
        rating < 30
            ? 'pink.500'
            : (rating < 60
                    ? 'blue.500'
                    : 'cyan.500');

    return (
        <AspectRatioConstraint
            w='30%'
            maxW='72px'
            maxH='72px'
            left='8px'
            ratio={1}
            bottom='8px'
            position='absolute'
        >
            <Center
                w='100%'
                h='100%'
                bg='blue.900'
                top='0px'
                left='0px'
                position='absolute'
                borderRadius='full'
            >
                <Box
                    w='100%'
                    h='100%'
                    bg='black'
                    opacity='0.6'
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
        </AspectRatioConstraint>
    );
};

export default CircularRating;
