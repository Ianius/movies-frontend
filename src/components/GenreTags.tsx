import { Tag, Wrap, WrapItem } from "@chakra-ui/react";
import { MovieGenre } from "../interfaces/movies";

interface Props {
    genres: Array<MovieGenre>;
    spacing?: string;
    py?: string | number;
}

const GenreTags = ({ genres, spacing = '8px', py }: Props) => {
    return (
        <Wrap
            spacing={spacing}
            w='100%'
            py={py}
        >
            {genres.map(genre =>
                <WrapItem
                    key={genre.id}
                >
                    <Tag
                        bg='mainDark'
                        borderRadius='sm'
                        variant='solid'
                        fontWeight='bold'
                    >
                        {genre.name}
                    </Tag>
                </WrapItem>
            )}
        </Wrap>
    );
};

export default GenreTags;
