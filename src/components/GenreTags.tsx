import { Tag, TagLabel, Wrap, WrapProps, WrapItem } from "@chakra-ui/react";
import { MovieGenre } from "../interfaces/movies";

interface Props extends WrapProps {
    genres: Array<MovieGenre>;
}

const GenreTags = ({ genres, spacing = '8px', py, ...rest }: Props) => {
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
