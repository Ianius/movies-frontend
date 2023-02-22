import { Tag, TagLabel, Wrap, WrapProps, WrapItem, useColorModeValue } from "@chakra-ui/react";
import { MovieGenre } from "../interfaces/movies";

interface Props extends WrapProps {
    genres: Array<MovieGenre>;
}

const GenreTags = ({ genres, spacing = '8px', py, ...rest }: Props) => {
    const [tagBgColor, tagTextColor] = [
        useColorModeValue('purple.200', 'purple.800'),
        useColorModeValue('purple.800', 'purple.200'),
    ];
    
    return (
        <Wrap
            w='100%'
            {...rest}
        >
            {genres.map(genre =>
                <WrapItem
                    key={genre.id}
                >
                    <Tag
                        // bg={tagBgColor}
                        colorScheme='purple'
                        borderRadius='sm'
                        variant='subtle'
                        fontWeight='bold'
                    >
                        <TagLabel>{genre.name}</TagLabel>
                    </Tag>
                </WrapItem>
            )}
        </Wrap>
    );
};

export default GenreTags;
